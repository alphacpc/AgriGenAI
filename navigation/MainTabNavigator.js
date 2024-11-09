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
//     height: 60,
        // flexDirection: "row",
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
                                <Entypo name="home" size={32} color={focused ? "green" : "black"} />
                        </View>
                
        }}/>

        <Tab.Screen name="Setting" component={Home} options={{
                tabBarIcon:({focused}) =><View style={styles.container}>
            <FontAwesome name="cog" size={24} color="black" />
                        
                        </View>
                
        }}/>

        <Tab.Screen name="Cart" component={Home} options={{
                tabBarIcon:({focused}) =><View style={styles.container}>
            <FontAwesome name="shopping-cart" size={24} color="black" />
                        
                        </View>
                
        }}/>

        <Tab.Screen name="Community" component={Home} options={{
                tabBarIcon:({focused}) =><View style={styles.container}>
            <FontAwesome name="users" size={24} color="black" />
                        
                        </View>
                
        }}/>

        <Tab.Screen name="User" component={Home} options={{
                tabBarIcon:({focused}) =><View style={styles.container}>
            <FontAwesome name="user" size={24} color="black" />
                        
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
