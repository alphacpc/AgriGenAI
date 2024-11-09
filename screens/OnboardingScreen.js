import React, { useState, useRef } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
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

  // Fonction pour afficher chaque slide
  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.slide}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
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


      {/* Contrôles de navigation */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.previousButton]}
          onPress={handlePrevious}
          disabled={currentIndex === 0} // Désactiver le bouton précédent sur la première slide
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        
        {renderProgressIndicator()}
        
        <TouchableOpacity
          style={styles.button}
          onPress={handleNext}
        >
            <Ionicons name="arrow-forward" size={24} color="white" />
          
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height,
    padding: 20,
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    position: 'absolute',
    bottom: 50,
    justifyContent: 'space-between',
    width: '80%',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 50,
    width: 50,
    height: 50,
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
    width: "10rem"
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
  progressContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  progressDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    margin: 5,
  },
  activeDot: {
    backgroundColor: '#007bff',
  },
});

export default OnboardingScreen;
