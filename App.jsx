import React, {useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


// Écrans de l'application
import HomeScreen from './src/screens/HomeScreen';
import SplashScreen from './src/screens/SplashScreen';
import Introslider from './src/screens/Introslider';


const Stack = createStackNavigator();

// Fonction principale de l'application
export default function App() {
  const [initialRoute] = useState('Splash'); 

  if (!initialRoute) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Intro" component={Introslider} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
