import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"




// const Tab = createBottomTabNavigator();
// const screenOptions = {
//   tabBarShowLabel: true,
//   headerShown: false,
//   tabBarStyle: {
//     position: "absolution",
//     bottom: 0,
//     right: 0,
//     left: 0,
//     elevation: 0,
//     height: 60,
//     background : "#F06"
//   }
// }




const HomeScreen = () => {
  return (

      <View style={styles.container}>
      <Text style={styles.text}>Bienvenue sur l'écran d'accueil!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
