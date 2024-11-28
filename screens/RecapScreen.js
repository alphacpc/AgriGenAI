import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Icône audio
import { FontAwesome } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { Audio } from 'expo-av'; 



const RecapScreen = () => {
        const route = useRoute()
        const { data, image } = route.params
        const [sound, setSound] = useState();
        const [isPlaying, setIsPlaying] = useState(false);
        const [isLoading, setIsLoading] = useState(false);
       
        const playAudio = async () => {
                try {
                        setIsLoading(true);
                        const { sound } = await Audio.Sound.createAsync(
                                require('../api/audio_files/b50af5c1-7ccf-41f2-a5cb-83d35537e1a6.mp3')
                        );
                        setSound(sound);
                        await sound.playAsync(); // Lancer la lecture de l'audio
                        setIsPlaying(true);
                        sound.setOnPlaybackStatusUpdate(updatePlaybackStatus); // Mettre à jour le statut de lecture
                } catch (error) {
                  console.error("Erreur lors de la lecture de l'audio", error);
                } finally {
                  setIsLoading(false);
                }
        };

        const updatePlaybackStatus = (status) => {
                if (status.didJustFinish) {
                  setIsPlaying(false);
                }
              };

        const stopAudio = async () => {
                if (sound) {
                        await sound.stopAsync();
                        setIsPlaying(false);
                }
        };
    
        useEffect(() => {
                return () => {
                if (sound) {
                        sound.unloadAsync();
                }
                };
        }, [sound]);
  
        return (
        <View>
        
                <View style={styles.header}>
                        <TouchableOpacity>
                                <FontAwesome name="bars" size={50} color="#218E54" />
                        </TouchableOpacity>

                        <View style={styles?.welcome}>
                                <Image source={require('../assets/logo-green.png')} style={styles.appIcon} />
                                <Text style={styles.headerText}>Bienvenue</Text>
                        </View>
                </View>


                <ScrollView contentContainerStyle={styles.container}>

                        <Image 
                                source={{uri:image}} 
                                style={styles.cardImage}
                        />

                        <View style={styles.card}>                                
                                <View style={styles.cardContent}>
                                        <View>
                                                <Text style={styles.cardTitle}>Diagnostique</Text>
                                                
                                                <Text style={styles.cardDescription}>
                                                        {data.analysis?.Diagnostique}
                                                </Text>
                                        </View>

                                        <View>
                                                <Text style={styles.cardTitle}>Symptomes</Text>
                                                
                                                <Text style={styles.cardDescription}>
                                                        {data.analysis?.Symptômes}
                                                </Text>
                                        </View>

                                        <View>
                                                <Text style={styles.cardTitle}>Traitements</Text>
                                                
                                                <Text style={styles.cardDescription}>
                                                        {data.analysis?.Traitement}
                                                </Text>
                                        </View>

                                        <TouchableOpacity style={styles.shareButton}>
                                                <FontAwesome name="share" size={38} color="#fff" />
                                        </TouchableOpacity>

                                        {/* <TouchableOpacity style={styles.audioButton}>
                                                <Icon name="volume-up" size={38} color="#fff" />
                                        </TouchableOpacity> */}

                                        <View>
                                                <TouchableOpacity style={styles.audioButton} onPress={isPlaying ? stopAudio : playAudio}>
                                                        <Icon name={isPlaying ? 'pause' : 'volume-up'} size={38} color="#fff" />
                                                </TouchableOpacity>
                                                <Text style={styles.text}>
                                                        {isPlaying ? 'Lecture en cours...' : 'Appuyez pour écouter'}
                                                </Text>
                                        </View>
                                </View>
                        </View>
                </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 140,
    backgroundColor: "#fff"
  },
  
  header: { flexDirection: 'row', alignItems: 'start', padding: 10, backgroundColor: '#fff', paddingTop: 40 },
  headerText: { fontSize: 20, fontWeight: 'bold', color:"#218E54" },
  appIcon: { width: 80, height: 20 },
  welcome: { marginLeft: 10},


  card: {
    backgroundColor: '#218E54',
    borderRadius: 14,
    marginBottom: 20,
    marginTop: 20,
    shadowRadius: 4,
  },


  cardImage: {
    width: '100%',
    height: 200,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#218E54"
  },

  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 32,
    color: "#fff",
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
    paddingLeft: 20
  },
  audioButton: {
    position: "absolute",
    right: 10,
    bottom: 10,
  },
  shareButton: {
        position: "absolute",
        right: 10,
        top: 20,
  },
  text:{
        color: "orange",
        fontWeight: "bold",
        fontSize: 18
  }
});

export default RecapScreen;
