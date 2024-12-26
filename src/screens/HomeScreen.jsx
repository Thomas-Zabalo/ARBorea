import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { CameraView } from 'expo-camera';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({ navigation }) {
  const [preference, setPreference] = useState('light');

  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme) {
          setPreference(savedTheme);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du thème:', error);
      }
    };
    loadThemePreference();
  }, []);

  const handleSwipe = (event) => {
    const { translationX } = event.nativeEvent;
    if (translationX < -100) {
      navigation.navigate('Profil');
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PanGestureHandler onGestureEvent={handleSwipe}>
        <View style={styles.container}>
          <CameraView style={styles.camera}>
            <View style={styles.iconContainer}>
              <TouchableOpacity
                style={[styles.iconButton, styles.TopRight]}
                onPress={() => navigation.navigate('Profil')}
              >
                <Icon name="gear" size={30} color={preference === 'dark' ? '#fff' : '#000'} />
              </TouchableOpacity>
            </View>
          </CameraView>
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  iconContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 20,
  },
  iconButton: {
    backgroundColor: 'rgba(140, 140, 140, 0.5)',
    borderRadius: 100,
    paddingHorizontal: 9,
    paddingVertical: 7.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  TopRight: {
    position: 'absolute',
    top: 60,
    right: 20,
  },
});
