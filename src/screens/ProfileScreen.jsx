import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function ProfileScreen() {
  // État pour savoir si le mode sombre est activé ou non
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Fonction pour récupérer la préférence de thème de AsyncStorage
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme) {
          setIsDarkMode(savedTheme === 'dark');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du thème:', error);
      }
    };
    loadThemePreference();
  }, []);

  // Fonction pour sauvegarder la préférence du thème
  const saveThemePreference = async (value) => {
    try {
      await AsyncStorage.setItem('theme', value ? 'dark' : 'light');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du thème:', error);
    }
  };

  // Fonction pour basculer entre les modes
  const toggleSwitch = (value) => {
    setIsDarkMode(value);
    saveThemePreference(value); // Sauvegarde le thème
  };

  // Styles en fonction du mode sombre
  const containerStyle = isDarkMode ? styles.containerDark : styles.containerLight;
  const textStyle = isDarkMode ? styles.textDark : styles.textLight;

  // Exemple d'informations de l'utilisateur
  const user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  };

  return (
    <View style={containerStyle}>
      {/* Section Avatar */}
      <View style={styles.avatarContainer}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
      </View>

      {/* Nom et Email */}
      <View style={styles.infoContainer}>
        <Text style={[styles.name, textStyle]}>{user.name}</Text>
        <Text style={[styles.email, textStyle]}>{user.email}</Text>
      </View>

      {/* Bouton Toggle pour le mode sombre */}
      <View style={styles.switchContainer}>
        <Text style={[textStyle, { marginBottom: 10 }]}>Mode Sombre</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isDarkMode}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Styles pour le mode sombre
  containerDark: {
    flex: 1,
    backgroundColor: '#121212', // Fond sombre
    padding: 20,
  },
  textDark: {
    color: '#fff', // Texte clair pour le mode sombre
  },

  // Styles pour le mode clair
  containerLight: {
    flex: 1,
    backgroundColor: '#fff', // Fond clair
    padding: 20,
  },
  textLight: {
    color: '#121212', // Texte sombre pour le mode clair
  },

  // Autres styles communs
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    marginBottom: 10,
  },
  switchContainer: {
    alignItems: 'center',
  },
});
