import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTasks } from '../TasksContext'; // Assurez-vous d'avoir un contexte pour gérer les tâches

const EditTask = () => {
    const { params } = useRoute();
    const id = params?.id;  // Utilisation de l'opérateur de chaînage optionnel pour éviter l'erreur si `params` est undefined

    const navigation = useNavigation();
    const { tasks, editTask } = useTasks();  // Contexte pour récupérer et modifier les tâches
    
    // Recherche de la tâche à modifier
    const taskToEdit = tasks.find((task) => task.id === id);
    
    // Définir l'état initial des champs
    const [title, setTitle] = useState(taskToEdit?.title || '');
    const [priority, setPriority] = useState(taskToEdit?.priority || 'normale');
    const [date, setDate] = useState(taskToEdit?.date || '');
    const [comments, setComments] = useState(taskToEdit?.comments?.map(comment => comment.text).join('\n') || ''); // Remplir avec les commentaires
    const [progress, setProgress] = useState(taskToEdit?.progress || 0);
    const [members, setMembers] = useState(taskToEdit?.members || []);
    const [memberNames, setMemberNames] = useState(taskToEdit?.memberNames?.join(', ') || '');
    const [isLoading, setIsLoading] = useState(false); 

    // Vérifier si la tâche existe, sinon retourner à l'écran précédent
    useEffect(() => {
        if (!taskToEdit) {
            Alert.alert('Erreur', 'Tâche introuvable');
            navigation.goBack();
        }
    }, [taskToEdit, navigation]);

    // Fonction pour sauvegarder les modifications
    const handleSave = async () => {
        if (!title || !priority || !date || progress === undefined) {
            Alert.alert('Erreur', 'Tous les champs sont requis !');
            return;
        }

        setIsLoading(true); 

        try {
            // Mise à jour de la tâche avec les nouvelles valeurs
            await editTask(id, {
                title,
                priority,
                date,
                comments: comments.split('\n').map(text => ({ text })),  // Conversion des commentaires en tableau
                members,
                progress,
                memberNames: memberNames.split(', ').map(name => name.trim()),
            });
            Alert.alert('Succès', 'Tâche mise à jour avec succès !');
            navigation.goBack(); 
        } catch (error) {
            Alert.alert('Erreur', 'Une erreur est survenue lors de la mise à jour');
        } finally {
            setIsLoading(false); 
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Modifier la Tâche</Text>

            <Text style={styles.label}>Titre</Text>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
            />

            <Text style={styles.label}>Priorité</Text>
            <Picker
                selectedValue={priority}
                style={styles.input}
                onValueChange={(itemValue) => setPriority(itemValue)}
            >
                <Picker.Item label="Urgente" value="urgent" />
                <Picker.Item label="Normale" value="normale" />
                <Picker.Item label="Autre" value="autre" />
            </Picker>

            <Text style={styles.label}>Date</Text>
            <TextInput
                style={styles.input}
                value={date}
                onChangeText={setDate}
                placeholder="YYYY-MM-DD"
            />

            <Text style={styles.label}>Commentaires</Text>
            <TextInput
                style={[styles.input, { height: 100 }]}
                value={comments}
                onChangeText={setComments}
                multiline
            />

            <Text style={styles.label}>Progression (%)</Text>
            <TextInput
                style={styles.input}
                value={String(progress)}
                onChangeText={(text) => setProgress(parseInt(text))}
                keyboardType="numeric"
            />

            <Text style={styles.label}>Membres</Text>
            <TextInput
                style={styles.input}
                value={memberNames}
                onChangeText={setMemberNames}
                placeholder="Membres séparés par des virgules"
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

export default EditTask;
