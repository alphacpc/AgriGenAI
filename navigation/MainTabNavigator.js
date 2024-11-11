import React from 'react';
import Home from '../screens/HomeScreen';
import Recap from '../screens/RecapScreen';
import { View, StyleSheet } from 'react-native';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Tab = createBottomTabNavigator();
const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 5,
        backgroundColor : "#FFF",
        borderColor: "white",
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

        <Tab.Screen name="Recap" component={Recap} options={{
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
