import React, { useEffect } from 'react';
import { View, Image, StyleSheet, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TimerScreen({ navigation }) {
    useEffect(() => {
        // Vérifier le token après un délai
        const timer = setTimeout(async () => {
            try {
                const token = await AsyncStorage.getItem('access_token');
                if (token) {
                    navigation.replace('Home');
                } else {
                    navigation.replace('Login');
                }
            } catch (error) {
                console.error("Erreur lors de la vérification du token :", error);
                navigation.replace('Login');
            }
        }, 1000);

        // Nettoyage du timer à la fin du cycle de vie du composant
        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={styles.timeArea}>
            <StatusBar barStyle="dark-content" />
            <Image
                source={require('../../assets/logo.png')}
                style={styles.image}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    timeArea: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
    },
});
