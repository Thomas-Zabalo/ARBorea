import React, { useEffect } from 'react';
import { StyleSheet, View, Button, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';  // Icônes FontAwesome
import { useNavigation } from '@react-navigation/native';
import { GLView } from 'expo-gl';
import { Renderer } from 'expo-three';
import * as THREE from 'three';

export default function HomeScreen () {
  const navigation = useNavigation();
  const [permission, requestPermission] = useCameraPermissions();


  useEffect(() => {
    const requestPermission = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    requestPermission();
  }, []);

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

  // Gérer le swipe
  const handleSwipe = (event) => {
    const { translationX } = event.nativeEvent;
    if (translationX < -100) {
      navigation.navigate('Profil');
    }
  };


  const onContextCreate = async (gl) => {
    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;

    const renderer = new Renderer({ gl });
    renderer.setSize(width, height);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    // Ajouter un cube 3D
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Animation du cube
    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
      gl.endFrameEXP();
    };

    animate();
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
        <GLView
          style={styles.glview}
          onContextCreate={onContextCreate}
          ref={glRef}
        />
    </PanGestureHandler>
    </GestureHandlerRootView >
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
  TopRight: {
    position: 'absolute',
    top: 50,
    right: 20,
  },
});