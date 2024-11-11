import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image, ImageBackground } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';


const CameraScreen = () => {
  const sizeIcon = 25;
  const [facing, setFacing] = useState('back');
  const [photo, setPhoto] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [pictureSizes, setPictureSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState(undefined);

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
    console.log(cameraRef.current)
    const data = await cameraRef.current?.takePictureAsync();
    setPhoto(data);
  };


  return (
    <View style={styles.container}>
      {
        photo ? (
        <View style={styles.previewContainer}>
          <ImageBackground source={{ uri: photo.uri }} style={styles.preview} />
          <TouchableOpacity style={styles.buttonImage} onPress={() => setPhoto(null)}>
            <Text>Reprendre</Text>
            <FontAwesome name="refresh" size={sizeIcon} color="#218E54" />
          </TouchableOpacity>
        </View>
      ) : (

      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <FontAwesome name="refresh" size={ sizeIcon } color="#218E54" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <FontAwesome name="camera" size={ sizeIcon } color="#218E54" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <FontAwesome name="send" size={ sizeIcon } color="#218E54" />
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
    marginHorizontal: 10,
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
  buttonImage: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
});



export default CameraScreen;
