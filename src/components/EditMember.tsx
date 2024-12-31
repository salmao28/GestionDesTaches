import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useMembers } from '../MembersContext';

const EditMember = () => {
    const { params } = useRoute();
    const { id } = params || {};
    const navigation = useNavigation();
    const { members, editMember } = useMembers();

    
    const memberToEdit = members.find((member) => member.id === id);

    
    const [name, setName] = useState(memberToEdit?.name || '');
    const [role, setRole] = useState(memberToEdit?.role || '');
    const [email, setEmail] = useState(memberToEdit?.email || '');
    const [isLoading, setIsLoading] = useState(false); 

    useEffect(() => {
        if (!memberToEdit) {
            Alert.alert('Erreur', 'Membre introuvable');
            navigation.goBack();
        }
    }, [memberToEdit, navigation]);

    const handleSave = async () => {
        if (!name || !role || !email) {
            Alert.alert('Erreur', 'Tous les champs sont requis !');
            return;
        }

        setIsLoading(true); 

        try {
            
            await editMember(id, { name, role, email });
            Alert.alert('Succès', 'Informations du membre mises à jour !');
            navigation.goBack(); 
        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la mise à jour');
        } finally {
            setIsLoading(false); 
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Modifier le Membre</Text>

            
            <Text style={styles.label}>Nom</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
            />

            
            <Text style={styles.label}>Rôle</Text>
            <TextInput
                style={styles.input}
                value={role}
                onChangeText={setRole}
            />

            
            <Text style={styles.label}>E-mail</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />

            
            <TouchableOpacity 
                style={[styles.addButton, isLoading && styles.buttonDisabled]} 
                onPress={handleSave}
                disabled={isLoading} 
            >
                <Text style={styles.addButtonText}>
                    {isLoading ? 'Enregistrement...' : 'Sauvegarder les Modifications'}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },
    input: {
        backgroundColor: '#FFF',
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#CCC',
        marginBottom: 15,
    },
    addButton: {
        backgroundColor: '#5DD9FC',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonDisabled: {
        backgroundColor: '#A0D8F1', 
    },
    addButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFF',
    },
});

export default EditMember;
