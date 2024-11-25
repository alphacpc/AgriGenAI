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

# Openai client
# Créer un client OpenAI
client = OpenAI()

app = FastAPI()

# Prompt système
system_prompt = """
Vous êtes un spécialiste en reconnaissance d'images dans le domaine de l'agriculture, en langue française créer par AgriGenAI. Veuillez toujours répondre en français. Vous pouvez identifier des plantes, cultures, et signes de maladies ou de carences sur les images prises dans un champ. N'hésitez pas à nommer les cultures ou à décrire les symptômes observés sur les plantes.
"""

def analyze_image(image_bytes: bytes) -> str:
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
                            "text": """Décris cette image:
Voici un exemple de réponse. Il faudra respecter le meme format pour toutes les générations:

Diagnostique:
Cette image montre des feuilles de vigne atteintes de mildiou (Plasmopara viticola), une maladie fongique grave qui affecte couramment la vigne.

Symptômes:
- Taches brunes à violacées sur les feuilles
- Zones nécrotiques en forme de mosaïque
- Dessèchement progressif des tissus foliaires
- Décoloration en "taches d'huile" caractéristique
- Les zones affectées deviennent brunes et se dessèchent
- Les feuilles présentent un aspect bicolore typique (vert/brun)

Traitement:
1.Mesures préventives :
- Aérer la végétation par une taille appropriée
- Éviter l'excès d'humidité
- Favoriser une bonne circulation d'air

2.Traitement curatif :
- Application de fongicides à base de cuivre (bouillie bordelaise)
- Produits systémiques homologués contre le mildiou
- Alternance des matières actives pour éviter les résistances
- Traitements préventifs en période à risque (printemps humide)
- Éliminer les feuilles contaminées pour réduire l'inoculum

3.Surveillance régulière :
- Observer les premières contaminations au printemps
- Suivre les bulletins d'alertes viticoles
- Adapter la protection en fonction de la pression parasitaire"""
                        }
                    ],
                }
            ],
        )
        return response.content[0].text
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def text_to_speech(text: str) -> str:
    try:

        # Créer un chemin unique pour le fichier audio
        output_dir = Path("audio_files")
        print("A")
        output_dir.mkdir(exist_ok=True)
        audio_file_name = f"{uuid.uuid4()}.mp3"
        print("B")
        audio_file_path = output_dir / audio_file_name
        print("C")

        # Générer l'audio à partir du texte
        # response = client.audio.speech.create(
        #     model="tts-1",
        #     voice="alloy",
        #     input=text
        # )
        # print(response)
        print("D")

        # Sauvegarder l'audio dans un fichier
        # response.stream_to_file(audio_file_path)
        print("E")

        # Retourner le nom du fichier audio
        # return audio_file_name
        return "Hello"
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
        print(1)
        # Convertir l'image en bytes au format JPEG
        buffer = io.BytesIO()
        image.save(buffer, format='JPEG')
        image_bytes = buffer.getvalue()
        print("A")
        
        # Analyser l'image
        analysis_text = analyze_image(image_bytes)
        print(2)
        # Générer l'audio à partir du texte
        # audio_file_name = text_to_speech(analysis_text)
        print(3)
        # Retourner le texte et l'URL pour télécharger l'audio
        return {
            "analysis": analysis_text,
            # "audio_url": f"/download-audio/{audio_file_name}"
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

