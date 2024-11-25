# main.py
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse, FileResponse
from anthropic import Anthropic
from PIL import Image
import base64
import io
import os
from dotenv import load_dotenv
from pathlib import Path
from openai import OpenAI
import uuid

# Charger les variables d'environnement depuis le fichier .env
load_dotenv()

# Récupérer les clés API depuis les variables d'environnement
ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

if not ANTHROPIC_API_KEY:
    raise ValueError("La clé ANTHROPIC_API_KEY n'est pas définie dans le fichier .env")

if not OPENAI_API_KEY:
    raise ValueError("La clé OPENAI_API_KEY n'est pas définie dans le fichier .env")

# Définir la clé API OpenAI comme variable d'environnement
os.environ["OPENAI_API_KEY"] = OPENAI_API_KEY

# Initialiser le client Anthropic avec la clé API
anthropic_client = Anthropic(api_key=ANTHROPIC_API_KEY)

# OpenAI client
client = OpenAI()

app = FastAPI()

# Prompt système modifié pour structurer la sortie
system_prompt = """
Vous êtes un spécialiste en reconnaissance d'images dans le domaine de l'agriculture, en langue française, créé par AgriGenAI. 
Votre tâche est de retourner une analyse structurée de l'image fournie, sous le format JSON suivant :

{
    "Diagnostique": "Diagnostique précis et clair",
    "Symptômes": "Liste des symptômes observés",
    "Traitement": "Recommandations pour traiter ou prévenir"
}

Vous devez remplir ces trois champs de manière claire et concise, et ne pas inclure de texte hors de cette structure JSON. Toutes les informations doivent être en français.
"""

def analyze_image(image_bytes: bytes) -> dict:
    # Encode l'image en Base64
    base64_string = base64.b64encode(image_bytes).decode('utf-8')
    
    try:
        response = anthropic_client.messages.create(
            model="claude-3-5-sonnet-20241022",
            system=system_prompt,
            max_tokens=1024,
            stream=False,
            messages=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "image",
                            "source": {
                                "type": "base64",
                                "media_type": "image/jpeg",
                                "data": base64_string,
                            },
                        },
                        {
                            "type": "text",
                            "text": """Décrivez l'image sous la forme d'un objet JSON structuré conformément au format défini dans le prompt."""
                        }
                    ],
                }
            ],
        )
        # Charger la réponse en tant qu'objet JSON
        analysis_data = response.content[0].text
        return eval(analysis_data)  # Transformer le JSON string en dict
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def text_to_speech(text: str) -> str:
    try:
        # Créer un chemin unique pour le fichier audio
        output_dir = Path("audio_files")
        output_dir.mkdir(exist_ok=True)
        audio_file_name = f"{uuid.uuid4()}.mp3"
        audio_file_path = output_dir / audio_file_name

        # Générer l'audio à partir du texte
        response = client.audio.speech.create(
            model="tts-1",
            voice="alloy",
            input=text
        )

        # Sauvegarder l'audio dans un fichier
        response.stream_to_file(audio_file_path)

        # Retourner le nom du fichier audio
        return audio_file_name
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors de la génération de l'audio: {str(e)}")

@app.post("/analyze-image/")
async def analyze_image_endpoint(file: UploadFile = File(...)):
    if file.content_type not in ["image/jpeg", "image/png"]:
        raise HTTPException(status_code=400, detail="Type de fichier non supporté. Veuillez télécharger une image JPEG ou PNG.")
    
    try:
        # Lire l'image téléchargée
        image_data = await file.read()
        image = Image.open(io.BytesIO(image_data))
        
        # Convertir l'image en bytes au format JPEG
        buffer = io.BytesIO()
        image.save(buffer, format='JPEG')
        image_bytes = buffer.getvalue()
        
        # Analyser l'image
        analysis = analyze_image(image_bytes)
        
        # Générer l'audio à partir du texte structuré
        # audio_file_name = text_to_speech(
        #     f"Diagnostique : {analysis['Diagnostique']}. Symptômes : {analysis['Symptômes']}. Traitement : {analysis['Traitement']}."
        # )
        
        # Retourner l'objet structuré et l'URL pour télécharger l'audio
        return {
            "analysis": {
                "Diagnostique": analysis["Diagnostique"],
                "Symptômes": analysis["Symptômes"],
                "Traitement": analysis["Traitement"],
            },
            # "audio": f"/download-audio/{audio_file_name}"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors de l'analyse de l'image ou de la génération de l'audio: {str(e)}")

@app.get("/download-audio/{audio_file_name}")
def download_audio(audio_file_name: str):
    audio_file_path = Path("audio_files") / audio_file_name
    if not audio_file_path.exists():
        raise HTTPException(status_code=404, detail="Fichier audio non trouvé.")
    return FileResponse(
        path=str(audio_file_path),
        media_type="audio/mpeg",
        filename="analysis.mp3"
    )

@app.get("/")
def read_root():
    return {"message": "API d'analyse d'images agricoles. Utilisez le endpoint /analyze-image/ pour analyser une image."}