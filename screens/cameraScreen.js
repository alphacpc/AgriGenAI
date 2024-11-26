import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image, ImageBackground } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const CameraScreen = () => {
  const sizeIcon = 25;
  const colorIcon = "#218E54"
  const cameraRef = useRef(null);
  const navigation = useNavigation();
  const [photo, setPhoto] = useState(null);
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Nous avons besoin de votre autorisation pour montrer la caméra</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }


  const takePhoto = async () => {
    const data = await cameraRef.current?.takePictureAsync();
    setPhoto(data);
  };

  const sendPhotoToApi = async () => {
    console.log("Send image")
    // if (!photo) {
    //   return;
    // }
    if (!photo.uri) {
      console.error("URI de la photo invalide :", photo.uri);
      return;
    }

    console.log("OOOOOOK")
    const formData = await new FormData();
    console.log(formData)
    console.log(formData.append("photo", {
      uri: photo.uri,
      type: "image/jpeg",
      name: "photo.jpg",
    }));

    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }


    console.log("Image size:", photo.uri);

    try {
      const response = await axios.post("http://192.168.75.171:8000/analyze-image/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Accept": "application/json",
        },
      });
      console.log("Réponse de l'API:", response);
      navigation.navigate("Recap", { data: response.data });
    } catch (error) {
      console.log("Ca ne marche pas")
      console.log(error)
      console.error("Erreur lors de l'envoi de la photo:", error);
    }
  };



  return (
    <View style={styles.container}>
      {
        photo ? (
        <View style={styles.previewContainer}>
          <ImageBackground source={{ uri: photo.uri }} style={styles.preview} />
          
          <View style={styles?.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => setPhoto(null)}>
              <FontAwesome name="refresh" size={sizeIcon} color={ colorIcon } />
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={sendPhotoToApi}>
              <FontAwesome name="send" size={sizeIcon} color={ colorIcon } />
            </TouchableOpacity>
          </View>
        </View>
      ) : (

      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <FontAwesome name="refresh" size={ sizeIcon } color={ colorIcon } />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <FontAwesome name="camera" size={ sizeIcon } color={ colorIcon } />
          </TouchableOpacity>

        </View>
      </CameraView> )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 5,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: "white",
    marginHorizontal: 20,
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 10

  },
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  preview: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});



export default CameraScreen;
