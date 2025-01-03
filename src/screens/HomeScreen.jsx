import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';


export default function Home({ navigation }) {

  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Nous avons besoin que vous activiez votre caméra pour accéder à l'application.</Text>
        <Button onPress={requestPermission} title="Activer la caméra" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera}>
      </CameraView>
    </View>
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