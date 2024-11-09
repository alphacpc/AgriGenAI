import React, { useState, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'; // Importation du dégradé

const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    image: require('../assets/image1.jpeg'),
    title: "Révolutionnez votre agriculture avec l'IA",
    description: 'Découvrez toutes les fonctionnalités de notre application.',
  },
  {
    id: '2',
    image: require('../assets/image2.jpeg'),
    title: "Maximisez vos rendements avec l'IA générative",
    description: 'Accédez à des outils puissants pour vous aider.',
  },
  {
    id: '3',
    image: require('../assets/image3.jpeg'),
    title: "Exploitez le pouvoir de l'IA pour des récoltes durables.",
    description: 'Créez un compte pour démarrer votre aventure.',
  },
];

const OnboardingScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
      flatListRef.current.scrollToIndex({ index: currentIndex + 1, animated: true });
    } else {
      navigation.navigate('Main');
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      flatListRef.current.scrollToIndex({ index: currentIndex - 1, animated: true });
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <ImageBackground source={item.image} style={[styles.slide, { width, height }]}>
        {/* Ajout du LinearGradient pour un léger effet sombre */}
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.8)']}
          style={[styles.gradient, { width, height }]}
        >
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
            {/* Tu peux ajouter la description ici si besoin */}
            {/* <Text style={styles.description}>{item.description}</Text> */}
          </View>
        </LinearGradient>
      </ImageBackground>
    );
  };

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
        ref={flatListRef}
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
        contentContainerStyle={{ flexGrow: 1 }}
      />

        <View style={styles?.logoContainer}>
                <Image source={require("../assets/logo-agri.png")} style={styles?.logo} />
        </View>

      {renderProgressIndicator()}

      <View style={styles.buttonsContainer}>

        <TouchableOpacity
          style={styles.button}
          onPress={handleNext}
        > 
            <Ionicons name="arrow-forward" size={40} color="white" />
        </TouchableOpacity>
      </View>
        
        {renderCreated()}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
//     flexDirection:"column",
    justifyContent: 'center',
    alignItems: 'center',
    height: "100%",

  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
    height: "100%",
    width: "100%"
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
        marginTop: 100,
  },
  title: {
    fontSize: 48,
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
        bottom: 120,
        margin: 0,
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
  },
  progressContainer: {
    flexDirection: 'row',
    position: "absolute",
    bottom: 80,
    margin: 0
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
        bottom: 40,
        margin: 0
  },
  createdText:{
        color: "#fff",
        fontWeight: "bold",
        fontSize: 10
  },
  logoContainer:{
        flexDirection: 'row',
        position: "absolute",
        top: 40,
            margin: 0,
            alignItems: 'center',
  },
});

export default OnboardingScreen;
