import React, { useState, useRef } from 'react';
import { StyleSheet, View, Button, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import Icon from 'react-native-vector-icons/FontAwesome';  // Icônes FontAwesome

export default function Home({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const slideAnimation = useRef(new Animated.Value(0)).current; // Valeur initiale pour l'animation
  const [firstLaunch, setFirstLaunch] = useState(true); // Indique si c'est le premier lancement

  useEffect(() => {
    if (firstLaunch) {
      // Lancer l'animation de slide-in
      Animated.timing(slideAnimation, {
        toValue: 1, // Fin de l'animation
        duration: 500, // Durée de l'animation
        useNativeDriver: true,
      }).start(() => {
        // Attendre 2 secondes avant le slide-out
        setTimeout(() => {
          Animated.timing(slideAnimation, {
            toValue: 0, // Retourner hors de l'écran
            duration: 500,
            useNativeDriver: true,
          }).start(() => setFirstLaunch(false)); // Cacher définitivement après l'animation
        }, 2000);
      });
    }
  }, [firstLaunch]);

  if (!permission) {
    return <View />; // Attente de la permission
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Nous avons besoin que vous activiez votre caméra pour accéder à l'application.</Text>
        <Button onPress={requestPermission} title="Activer la caméra" />
      </View>
    );
  }

  // Gérer le swipe
  const handleSwipe = (event) => {
    const { translationX } = event.nativeEvent;
    if (translationX < -100) {
      navigation.navigate('Leaderboard'); // Naviguer vers Leaderboard si swipe gauche
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
                <Icon name="gear" size={30} color="white" />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.iconButton, styles.BottomRight]}
                onPress={() => navigation.navigate('Shop')}
              >
                <Icon name="shopping-cart" size={30} color="white" />
              </TouchableOpacity>
            </View>
          </CameraView>

          {/* Afficher le panneau informatif */}
          {firstLaunch && (
            <Animated.View
              style={[
                styles.infoPanel,
                {
                  transform: [
                    {
                      translateX: slideAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [300, 0], // Animation de droite à gauche
                      }),
                    },
                  ],
                },
              ]}
            >
              <Text style={styles.infoText}>Swipe left to open Leaderboard!</Text>
            </Animated.View>
          )}
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
  containerInfo: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    textAlign: 'center',
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
  TopLeft: {
    position: 'absolute',
    top: 50,
    left: 30,
  },
  TopRight: {
    position: 'absolute',
    top: 50,
    right: 30,
  },
  BottomLeft: {
    position: 'absolute',
    bottom: 30,
    left: 30,
  },
  BottomRight: {
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
  webview: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  infoPanel: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 10,
    borderRadius: 8,
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});
