import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet } from 'react-native';

import Home from '../screens/Home';
import Profile from '../screens/Profile';
import { Entypo, FontAwesome } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();
const screenOptions = {
  tabBarShowLabel: true,
  headerShown: false,
  tabBarStyle: {
    height: 60,
    backgroundColor : "#F06"
  }
}

const MainTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Home" component={Home} options={{
        tabBarIcon:({focused}) =><View style={styles.container}>
                        {/* <FontAwesome name="home" size={24} color={focused ? "green" : "black"} /> */}
                        <Entypo name="home" size={24} color={focused ? "green" : "black"} />
                </View>
        
      }}/>
      <Tab.Screen name="Profile" component={Profile} options={{
        tabBarIcon:({focused}) => <View style={styles.container}>
                        {/* <FontAwesome name="home" size={24} color={focused ? "green" : "black"} /> */}
                        <Entypo name="user" size={24} color={focused ? "green" : "black"} />
        </View>
        
      }}/>
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
        container: { 
                alignItems: "center", 
                justifyContent: "center", 
        },
})

export default MainTabNavigator;
