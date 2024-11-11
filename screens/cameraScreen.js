import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from "expo-media-library"

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);


  useEffect(()=>{
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await  Camera.requestCameraPermissionsAsync();
      setHasPermission(cameraStatus.status === "granted")
    })
  },[])


  return (
    <View style={styles.container}>
     <Camera
      style={styles?.camera}
      type={type}
      flashMode={flash}
      ref={cameraRef}
     >
      <Text>Hello</Text>
     </Camera>

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    borderRadius: 20,
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
