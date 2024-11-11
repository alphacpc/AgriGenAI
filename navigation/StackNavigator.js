import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// import OnboardingScreen from '../screens/OnboardingScreen';
import MainTabNavigator from './MainTabNavigator';
import CameraScreen from '../screens/cameraScreen';
import RecapScreen from '../screens/RecapScreen';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="Onboarding" component={OnboardingScreen} /> */}
      <Stack.Screen name="Main" component={MainTabNavigator} />
      <Stack.Screen name="Camera" component={CameraScreen} />
      <Stack.Screen name="Recap" component={RecapScreen} />

    </Stack.Navigator>
  );
};

export default StackNavigator;
