import React from 'react';
import { StyleSheet, View, Button, TouchableOpacity, Text } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GestureHandlerRootView, PanGestureHandler, GestureHandlerGestureEvent } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';


type RootParamList = {
  Profil: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootParamList, 'Profil'>;

interface HomeProps {
  navigation: HomeScreenNavigationProp;
}

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const [permission, requestPermission] = useCameraPermissions();

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
  const handleSwipe = (event: GestureHandlerGestureEvent) => {
    const { translationX } = event.nativeEvent;

    if (typeof translationX === 'number' && translationX < -100) {
      navigation.navigate('Profil'); // Naviguer vers Profil si swipe à gauche
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
            </View>
          </CameraView>
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 50,
    paddingVertical: 13,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  TopRight: {
    position: 'absolute',
    top: 50,
    right: 20,
  },
  message: {
    textAlign: 'center',
  },
});

export default Home;
