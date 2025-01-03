import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';  // Icônes FontAwesome
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(false); // Etat pour la permission
  const [permission, requestPermission] = useCameraPermissions(); // Permissions caméra

  // Demander la permission de la caméra au lancement
  useEffect(() => {
    const getPermission = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getPermission();
  }, []);

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          Nous avons besoin que vous activiez votre caméra pour accéder à l'application.
        </Text>
        <Button onPress={() => requestPermission()} title="Activer la caméra" />
      </View>
    );
  }

  // Gérer le swipe
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
          <Camera style={styles.camera}>
            <View style={styles.iconContainer}>
              <TouchableOpacity
                style={[styles.iconButton, styles.TopRight]}
                onPress={() => navigation.navigate('Profil')}
              >
                <Icon name="gear" size={30} color="white" />
              </TouchableOpacity>
            </View>
          </Camera>
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
  message: {
    textAlign: 'center',
    margin: 10,
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 50,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  TopRight: {
    position: 'absolute',
    top: 50,
    right: 20,
  },
});
