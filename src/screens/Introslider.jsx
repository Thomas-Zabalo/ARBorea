import { View, Text, Image } from 'react-native';
import React from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import { COLORS, SIZES } from '../constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

const slides = [
    {
        key: 1,
        title: 'Title 1',
        text: 'Description.\nSay something cool',
        image: require('../../assets/logo.png'),
    },
    {
        key: 2,
        title: 'Title 2',
        text: 'Other cool stuff',
        image: require('../../assets/logo.png'),
    },
    {
        key: 3,
        title: 'Rocket guy',
        text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
        image: require('../../assets/logo.png'),
    },
    {
        key: 4,
        title: 'Rocket guy',
        text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
        image: require('../../assets/logo.png'),
    }
];

export default function Introslider({ navigation }) {

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
        <AppIntroSlider
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
                                width: SIZES.width * 0.8, // Correction pour le width
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