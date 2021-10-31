import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/home';
import VerificationScreen from './screens/verification';
import FaceRD from './screens/facerd';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="VerificationScreen" component={VerificationScreen} />
        <Stack.Screen name="FaceRD" component={FaceRD} />
      </Stack.Navigator>
      <StatusBar backgroundColor='#37C584' barStyle='light-content' />
    </NavigationContainer>
  )
}