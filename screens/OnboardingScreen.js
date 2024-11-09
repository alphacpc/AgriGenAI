import React, { useState, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    image: require('../assets/image1.jpeg'), // Remplacez par votre propre image
    title: 'Bienvenue dans l\'app',
    description: 'Découvrez toutes les fonctionnalités de notre application.',
  },
  {
    id: '2',
    image: require('../assets/image2.jpeg'),
    title: 'Explorez les fonctionnalités',
    description: 'Accédez à des outils puissants pour vous aider.',
  },
  {
    id: '3',
    image: require('../assets/image3.jpeg'),
    title: 'Rejoignez-nous',
    description: 'Créez un compte pour démarrer votre aventure.',
  },
];

const OnboardingScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null); // Référence pour accéder à FlatList

  // Fonction pour changer de slide
  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      // Passer à la slide suivante
      setCurrentIndex(currentIndex + 1);
      flatListRef.current.scrollToIndex({ index: currentIndex + 1, animated: true });
    } else {
      // Aller à l'écran d'accueil ou autre destination
      navigation.navigate('Home'); // Remplacez 'Home' par le nom de votre écran d'accueil
    }
  };

  // Fonction pour revenir à la slide précédente
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      flatListRef.current.scrollToIndex({ index: currentIndex - 1, animated: true });
    }
  };

  // Fonction pour afficher chaque slide avec ImageBackground
  const renderItem = ({ item, index }) => {
    return (
      <ImageBackground source={item.image} style={[styles.slide, { width, height }]}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
      </ImageBackground>
    );
  };

  // Fonction pour afficher les indicateurs de progression (stepping)
  const renderProgressIndicator = () => {
    return (
      <View style={styles.progressContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.progressDot,
              currentIndex === index && styles.activeDot,
            ]}
          />
        ))}
      </View>
    );
  };

  const renderCreated = () => {
        return (
            <View style={styles?.createdContainer}>
              <Text style={styles?.createdText}>Développé par AgriGenAI</Text>
            </View>
        );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef} // Référence pour pouvoir utiliser scrollToIndex
        data={slides}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const index = Math.floor(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
        initialScrollIndex={currentIndex}
      />
      
      {/* Indicateurs de progression */}
      {renderProgressIndicator()}

      {/* Contrôles de navigation */}
      <View style={styles.buttonsContainer}>
        {/* <TouchableOpacity
          style={[styles.button, styles.previousButton]}
          onPress={handlePrevious}
          disabled={currentIndex === 0} // Désactiver le bouton précédent sur la première slide
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity> */}
        
        <TouchableOpacity
          style={styles.button}
          onPress={handleNext}
        > 
            <Ionicons name="arrow-forward" size={40} color="white" />
          
        </TouchableOpacity>
      </View>


          {/* Indicateurs de progression */}
      {renderCreated()}



    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:"column",
    justifyContent: 'center',
    alignItems: 'center',
//     backgroundColor: '#fff',
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
  },
  textContainer: {
        marginTop: 100,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
  },
  buttonsContainer: {
        position: 'absolute',
        backgroundColor: "#FO5",
        bottom: 120,
  },
  button: {
    backgroundColor: '#218E54',
    padding: 10,
    borderRadius: 50,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previousButton: {
    backgroundColor: '#ccc',
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 32,
//     marginLeft: 10,
  },
  progressContainer: {
    flexDirection: 'row',
    position: "absolute",
    bottom: 80
//     marginBottom: 20,
  },
  progressDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginHorizontal: 6,
  },
  activeDot: {
    backgroundColor: '#218E54',
    width: 45,
    height: 10,
  },
  createdContainer: {
        flexDirection: 'row',
        position: "absolute",
        bottom: 40
  },
  createdText:{
        color: "#fff",
        fontWeight: "bold",
        fontSize: 10
  }
});

export default OnboardingScreen;