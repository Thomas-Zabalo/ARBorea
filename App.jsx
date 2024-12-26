import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Écrans de l'application
import HomeScreen from './src/screens/HomeScreen';
import TimerScreen from './src/screens/TimerScreen';
import LoginScreen from './src/screens/LoginScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import MyARScene from './src/screens/TestARScreen';

// Création des Navigateurs
const Stack = createStackNavigator();

// Fonction principale de l'application
export default function App() {
  const [initialRoute, setInitialRoute] = useState('Test'); // Définir la route initiale

  useEffect(() => {
    const checkAuthToken = async () => {
      try {
        const token = await AsyncStorage.getItem('access_token'); // Vérifier l'existence du token
        if (token) {
          setInitialRoute('Test'); // Si le token existe, diriger vers Home
        } else {
          setInitialRoute('Timer'); // Sinon, diriger vers l'écran Timer ou Login
        }
      } catch (error) {
        console.error('Erreur lors de la vérification du token:', error);
      }
    };

    checkAuthToken();
  }, []);

  if (!initialRoute) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen name="Timer" component={TimerScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Test" component={MyARScene} options={{ headerShown: false }} />
        <Stack.Screen name="Profil" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
