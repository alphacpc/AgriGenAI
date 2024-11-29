Voici une version synthétique du fichier README.md pour votre projet React Native avec Expo et FastAPI :

Projet React Native avec Expo
Pré-requis
Assurez-vous d'avoir installé :
Node.js (version 18)
Yarn
Expo CLI : yarn global add expo-cli
Python 3.x avec virtualenv
Installation et démarrage
1. Configuration du projet React Native
Clonez le dépôt :
 git clone <url-du-depot>
cd <nom-du-dossier>


Installez les dépendances :
 yarn install


Démarrez le projet :
 yarn start


Téléchargez l'application Expo Go sur votre téléphone depuis le Play Store ou l'App Store.
Scannez le QR Code affiché pour visualiser l'application.

2. Configuration et démarrage de l'API FastAPI
Naviguez dans le dossier de l'API :
 cd api


Créez un environnement virtuel :
 python -m venv env
source env/bin/activate  # Sous Windows : env\Scripts\activate


Installez les dépendances :
 pip install -r requirements.txt


Lancez le serveur FastAPI :
 uvicorn main:app --host 0.0.0.0 --port 8000


Votre API est maintenant accessible sur http://0.0.0.0:8000.

Notes
Expo Go est nécessaire pour tester l'application sur un appareil mobile.
Modifiez les fichiers .env si des variables d'environnement sont requises.

Cela permet d’être clair et concis tout en couvrant toutes les étapes nécessaires.

