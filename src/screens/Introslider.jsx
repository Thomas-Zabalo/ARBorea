import { View, Text, Image } from 'react-native';
import React, { useEffect } from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import { COLORS, SIZES } from '../constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

const slides = [
    {
        key: 1,
        title: "Activer la caméra",
        text: "Pour démarrer, autorisez l'accès à votre caméra afin de scanner les marqueurs en réalité augmentée.",
        image: require("../../assets/undraw_camera_jfaj.png"),
    },
    {
        key: 2,
        title: "Scanner un QR Code",
        text: "Scannez le QR code fourni pour charger un modèle 3D ou un contenu interactif.",
        image: require("../../assets/undraw_taking-photo_s23u.png"),
    },
    {
        key: 3,
        title: "Explorer en Réalité Virtuelle",
        text:
            "Plongez dans l'expérience de réalité virtuelle et découvrez des modèles 3D immersifs.",
        image: require("../../assets/undraw_augmented-reality_3ie0.png"),
    },
];

export default function Introslider({ navigation }) {
    useEffect(() => {
        const checkFirstLaunch = async () => {
            const isFirstLaunch = await AsyncStorage.getItem('isFirstLaunch');
            if (!isFirstLaunch) {
                await AsyncStorage.setItem('isFirstLaunch', 'false');
            }
        };

        checkFirstLaunch();
    }, []);

    const buttonLabel = (label) => {
        return (
            <View style={{ padding: 12 }}>
                <Text style={{
                    color: COLORS.title,
                    fontWeight: '600',
                    fontSize: SIZES.h4
                }}>
                    {label}
                </Text>
            </View>
        );
    };

    return (
        <AppIntroSlider style={{ backgroundColor: "white" }}
            data={slides}
            renderItem={({ item }) => {
                return (
                    <View
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            padding: 15,
                            paddingTop: 100
                        }}
                    >
                        <Image
                            source={item.image}
                            style={{
                                width: SIZES.width * 0.8,
                                height: 400,
                            }}
                            resizeMode="contain"
                        />
                        <Text
                            style={{
                                fontWeight: 'bold',
                                fontSize: SIZES.h1,
                                color: COLORS.title,
                            }}>
                            {item.title}
                        </Text>
                        <Text style={{
                            textAlign: 'center',
                            paddingTop: 5,
                            color: COLORS.title,
                        }}>
                            {item.text}
                        </Text>
                    </View>
                );
            }}
            activeDotStyle={{
                backgroundColor: COLORS.primary,
                width: 30,
            }}
            showSkipButton
            renderNextButton={() => buttonLabel("Next")}
            renderSkipButton={() => buttonLabel("Skip")}
            renderDoneButton={() => buttonLabel("Done")}
            onDone={() => navigation.navigate("Home")}
        />
    );
}
