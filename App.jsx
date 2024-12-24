import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // Import de BottomTabNavigator
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

// Écrans de l'application
import HomeScreen from './src/screens/HomeScreen';
import TimerScreen from './src/screens/TimerScreen';
import LoginScreen from './src/screens/LoginScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ShopScreen from './src/screens/ShopScreen';
import LeaderScreen from './src/screens/LeaderScreen';
import InventoryScreen from './src/screens/InventoryScreen'; // Écran Inventaire

// Création des Navigateurs
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator(); // Déclaration du Tab Navigator

// Fonction principale de l'application
export default function App() {
  const [initialRoute, setInitialRoute] = useState('Timer'); // Définir la route initiale

  useEffect(() => {
    const checkAuthToken = async () => {
      try {
        const token = await AsyncStorage.getItem('access_token'); // Vérifier l'existence du token
        if (token) {
          setInitialRoute('Home'); // Si le token existe, diriger vers Home
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

  // Fonction pour les onglets du bas
  const BottomTabNavigator = () => (
    <Tab.Navigator
      initialRouteName="Shop"
    >
      <Tab.Screen
        name="Shop"
        component={ShopScreen}
        options={{
          tabBarLabel: 'Shop',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="shopping-basket" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Inventory"
        component={InventoryScreen}
        options={{
          tabBarLabel: 'Inventaire',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="archive" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen name="Timer" component={TimerScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Profil" component={ProfileScreen} />
        <Stack.Screen name="Leaderboard" component={LeaderScreen} />
        <Stack.Screen name="Shop" component={BottomTabNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
