import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Alert,
    Image,
    TouchableOpacity,
    Button,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function AuthScreen() {
    const [isLogin, setIsLogin] = useState(true);
    const [form, setForm] = useState({
        username: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const navigation = useNavigation();

    const toggleAuthMode = () => {
        setIsLogin(!isLogin);
        setForm({ username: '', password: '' });
        setErrorMessage('');
    };

    const handleSubmit = async () => {
        const apiUrl = isLogin
            ? 'https://test.nanodata.cloud/signin'
            : 'https://test.nanodata.cloud/register';

        try {
            const response = await axios.post(apiUrl, form);
            const { access_token, refresh_token } = response.data;

            if (access_token) {
                console.log('Access token received:', access_token);

                // Stocker les tokens dans AsyncStorage
                await AsyncStorage.setItem('access_token', access_token);
                await AsyncStorage.setItem('refresh_token', refresh_token);

                navigation.replace('Home'); // Navigue vers la page d'accueil
            }
        } catch (error) {
            if (error.response && error.response.data) {
                console.log('Error during submission:', error); // Log complet de l'erreur
                setErrorMessage(error.response.data.error || 'Une erreur inconnue s\'est produite');
                presentToast(error.response.data.error || 'Une erreur inconnue s\'est produite');
            } else if (error.response && error.response.status === 401) {
                setErrorMessage('Wrong Credentials');
                presentToast('Wrong Credentials');
            } else {
                setErrorMessage('Network error, please try again later.');
                presentToast('Network error, please try again later.');
            }
        }
    };

    const presentToast = (message) => {
        Alert.alert('Erreur', message, [{ text: 'OK' }]);
    };

    return (
        <View style={styles.authForm}>
            <Text style={styles.title}>ARBorea</Text>
            <View style={styles.formGroup}>
                <Text>Nom d'utilisateur</Text>
                <TextInput
                    style={styles.input}
                    placeholder={isLogin ? 'Entrer votre nom' : 'Saisissez votre nom'}
                    value={form.username}
                    onChangeText={(text) => setForm({ ...form, username: text })}
                />
            </View>

            <View style={styles.formGroup}>
                <Text>Mot de passe</Text>
                <TextInput
                    style={styles.input}
                    placeholder={isLogin ? 'Entrer votre mot de passe' : 'Saisissez votre nouveau mot de passe'}
                    secureTextEntry
                    value={form.password}
                    onChangeText={(text) => setForm({ ...form, password: text })}
                />
            </View>

            {/* En plus si on a le temps de faire un page pour le mot de pass oublié mais ça veux dire qu'il faut ajouter un input email dans l'inscription ou numéro de téléphone pour envoyer un code ou pour un vérification */}

            {/* {isLogin && (
                <Button
                    title="Mot de passe oublié"
                    onPress={() => navigation.navigate('ForgotPassword')}
                />
            )} */}

            {/* Bouton rond dynamique prenant la largeur du formulaire */}
            <TouchableOpacity
                style={styles.roundButton}
                onPress={handleSubmit}
            >
                <Text style={styles.buttonText}>
                    {isLogin ? "Se connecter" : "S'enregistrer"}
                </Text>
            </TouchableOpacity>

            <View style={styles.switchModeContainer}>
                <Text>
                    {isLogin ? "Vous n'avez pas de compte ?" : 'Vous avez déjà un compte ?'}
                </Text>
                <TouchableOpacity onPress={toggleAuthMode}>
                    <Text style={styles.switchModeButtonText}>
                        {isLogin ? " S'inscrire" : " Se connecter"}
                    </Text>
                </TouchableOpacity>
            </View>

            {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    authForm: {
        maxWidth: 700,
        margin: 'auto',
        padding: 20,
        width: '90%',
        alignSelf: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
        color: '#70B77E',
    },
    formGroup: {
        marginBottom: 15,
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10,
        paddingLeft: 10,
        marginTop: 10
    },
    roundButton: {
        backgroundColor: '#70B77E',
        width: '100%',
        height: 50,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    switchModeContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    switchModeButtonText: {
        color: '#70B77E',
        fontWeight: 'bold',
        marginLeft: 5,
    },
    errorMessage: {
        color: 'red',
        textAlign: 'center',
        marginTop: 15,
    }
});
