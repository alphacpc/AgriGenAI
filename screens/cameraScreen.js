import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { Camera } from 'expo-camera';

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [photo, setPhoto] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      // Demander la permission pour accéder à la caméra
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // Si la permission n'est pas encore donnée
  if (hasPermission === null) {
    return <Text>Demande d'autorisation pour la caméra...</Text>;
  }
  // Si l'utilisateur refuse la permission
  if (hasPermission === false) {
    return <Text>Accès à la caméra refusé</Text>;
  }

  // Fonction pour prendre la photo
  const takePicture = async () => {
    if (cameraRef.current) {
      const photoData = await cameraRef.current.takePictureAsync();
      setPhoto(photoData.uri); // Sauvegarde l'URI de la photo prise
    }
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={cameraRef}>
        <View style={styles.cameraControls}>
          <Button title="Prendre une photo" onPress={takePicture} />
        </View>
      </Camera>

      {/* Afficher la photo prise */}
      {photo && (
        <View style={styles.preview}>
          <Text>Photo prise !</Text>
          <Image source={{ uri: photo }} style={styles.photo} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    width: '100%',
    height: '70%',
  },
  cameraControls: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 30,
  },
  preview: {
    marginTop: 20,
    alignItems: 'center',
  },
  photo: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
});

export default CameraScreen;
