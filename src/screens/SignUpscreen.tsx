import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigationListBase, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../components/Navigation';

const SignUpScreen = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const handleSignUp = () => {
        if (!fullName || !email || !password || !confirmPassword) {
            Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert('Erreur', 'Les mots de passe ne correspondent pas.');
            return;
        }
        if (password.length < 6) {
            Alert.alert('Erreur', 'Le mot de passe doit contenir au moins 6 caractères.');
            return;
        }
        Alert.alert('Inscription réussie', 'Votre compte a été créé avec succès.');
        navigation.replace('Login');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Créer un compte</Text>
            <TextInput
                style={styles.input}
                placeholder="Nom complet"
                placeholderTextColor="#888"
                value={fullName}
                onChangeText={setFullName}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#888"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Mot de passe"
                placeholderTextColor="#888"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Confirmer le mot de passe"
                placeholderTextColor="#888"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />
            <View style={styles.buttonContainer}>
                <Button title="S'inscrire" color="#333" onPress={handleSignUp} />
            </View>
            <View style={styles.footer}>
                <Text>Déjà un compte ? </Text>
                <Text
                    style={styles.link}
                    onPress={() => navigation.navigate('Login')}
                >
                    Connexion
                </Text>
            </View>
            <View style={styles.forgotPassword}>
                <Button
                    title="Mot de passe oublié ?"
                    color="#007bff"
                    onPress={() => navigation.navigate('ForgotPassword')}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
        color: '#333',
    },
    buttonContainer: {
        marginTop: 10,
        borderRadius: 5,
        overflow: 'hidden',
    },
    footer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    link: {
        color: '#007bff',
        fontWeight: 'bold',
        marginLeft: 5,
    },
    forgotPassword: {
        marginTop: 20,
    },
});

export default SignUpScreen;
