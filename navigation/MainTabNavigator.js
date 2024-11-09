import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet } from 'react-native';

import Home from '../screens/Home';
import Profile from '../screens/Profile';
import { Entypo, FontAwesome } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();
const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 5,
        backgroundColor : "#FFF"
  }
}

const MainTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen name="Home" component={Home} options={{
                tabBarIcon:({focused}) =><View style={styles.container}>
                                <Entypo name="home" size={30} color={focused ? "#218E54" : "#218E54"} />
                        </View>
                
        }}/>

        <Tab.Screen name="Setting" component={""} options={{
                tabBarIcon:({focused}) =><View style={styles.container}>
            <FontAwesome name="cog" size={30} color="#218E54" />
                        
                        </View>
                
        }}/>

        <Tab.Screen name="Cart" component={""} options={{
                tabBarIcon:({focused}) =><View style={styles.container}>
            <FontAwesome name="shopping-cart" size={30} color="#218E54" />
                        
                        </View>
                
        }}/>

        <Tab.Screen name="Community" component={""} options={{
                tabBarIcon:({focused}) =><View style={styles.container}>
            <FontAwesome name="users" size={30} color="#218E54" />
                        
                        </View>
                
        }}/>

        <Tab.Screen name="User" component={""} options={{
                tabBarIcon:({focused}) =><View style={styles.container}>
            <FontAwesome name="user" size={30} color="#218E54" />
                        
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
