import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../components/Navigation';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
    const [email, setEmail] = useState('salma1234@gmail.com');
    const [password, setPassword] = useState('escodeve123');
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const handleLogin = () => {
        if (email === 'salma1234@gmail.com' && password === 'escodeve123') {
            navigation.replace('Projects');
        } else {
            Alert.alert('Invalid Credentials', 'Please check your email and password.');
        }
    };

    return (
        <View style={styles.container}>
            
            <View style={styles.pyramid} />
            <Text style={styles.header}>Gestion des projets</Text>
            <View style={styles.logoContainer}>
                <Text style={styles.logoText}>Escodeve</Text>
            </View>
            <Text style={styles.title}>login</Text>
            <TextInput
                style={styles.input}
                placeholder="your email here"
                placeholderTextColor="#BDBDBD"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="your password here"
                placeholderTextColor="#BDBDBD"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>log in</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
                <Text style={styles.forgotPassword}>forgot password? <Text style={styles.link}>Click here</Text></Text>
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
        bottom: -250, 
        borderRadius: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#000',
        marginBottom: 5,
        marginTop: 0, 
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

export default LoginScreen;
