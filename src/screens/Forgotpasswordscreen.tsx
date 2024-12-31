import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { RootStackParamList } from './Navigation';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../components/Navigation';

const ForgotPasswordScreen = () => {
    const [identifier, setIdentifier] = useState('');
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const handleForgotPassword = () => {
        if (!identifier) {
            Alert.alert('Erreur', 'Veuillez entrer une adresse e-mail ou un nom d’utilisateur.');
            return;
        }

        // Simuler une requête de récupération de mot de passe
        Alert.alert(
            'Instructions envoyées',
            'Si un compte correspond à cette information, vous recevrez des instructions de réinitialisation.',
            [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
        );
    };

    return (
        <View style={styles.container}>
            {/* Pyramid Shape at the Bottom */}
            <View style={styles.pyramid} />
            <Text style={styles.header}>Gestion des projets</Text>
            <View style={styles.logoContainer}>
                <Text style={styles.logoText}>Escodeve</Text>
            </View>
            <Text style={styles.title}>Mot de passe oublié</Text>
            <Text style={styles.description}>
                Entrez votre adresse e-mail ou votre nom d’utilisateur pour récupérer votre compte.
            </Text>
            <TextInput
                style={styles.input}
                placeholder="E-mail ou nom d'utilisateur"
                placeholderTextColor="#BDBDBD"
                value={identifier}
                onChangeText={setIdentifier}
                autoCapitalize="none"
            />
            <TouchableOpacity style={styles.loginButton} onPress={handleForgotPassword}>
                <Text style={styles.loginButtonText}>Envoyer</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.forgotPassword}>Retour à la <Text style={styles.link}>Connexion</Text></Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#BDEAFF',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    pyramid: {
        position: 'absolute',
        width: 800,
        height: 800,
        backgroundColor: '#FFF',
        transform: [{ rotate: '45deg' }],
        bottom: -250, // Position the pyramid at the bottom
        borderRadius: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#000',
        marginBottom: 5,
        marginTop: 0, // Adjusted to move the title closer to the top
    },
    logoContainer: {
        alignSelf: 'center',
        marginBottom: 20,
    },
    logoText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#5DD9FC',
    },
    title: {
        fontSize: 22,
        textAlign: 'center',
        fontWeight: '600',
        color: '#000',
        marginBottom: 30,
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
        color: '#555',
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        fontSize: 16,
        marginBottom: 20,
        padding: 5,
        color: '#000',
        width: '100%',
    },
    loginButton: {
        backgroundColor: '#5DD9FC',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 20,
        width: '100%',
    },
    loginButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    forgotPassword: {
        fontSize: 14,
        textAlign: 'center',
        color: '#000',
    },
    link: {
        color: '#5DD9FC',
        textDecorationLine: 'underline',
    },
});

export default ForgotPasswordScreen;
