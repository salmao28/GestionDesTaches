import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { memberApi } from '../services/membersServices';
import { tasksApi } from '../services/tasksServices';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../components/Navigation';

interface Comment {
    id: string;
    comment: string;
}

interface Link {
    id: string;
    link: string;
}

interface Task {
    title: string;
    priority: string;
    status: string;
    date: string;
    comments: Comment[];
    links: Link[];
    members: string[];
    progress: number;
}

const AddTaskScreen = () => {
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState<'urgent' | 'normale'>('normale');
    const [status, setStatus] = useState<'en cours' | 'at risk' | 'completed'>('en cours');
    const [date, setDate] = useState('');
    const [comments, setComments] = useState<string[]>([]);
    const [links, setLinks] = useState<string[]>([]);
    const [progress, setProgress] = useState<number>(0);
    const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
    const [membersIds, setMembersIds] = useState<string[]>([]);
    const [members, setMembers] = useState<any[]>([]);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const data = await memberApi.getAll();
                setMembers(data.data || []);
            } catch (error) {
                console.error('Error fetching members:', error);
            }
        };

        fetchMembers();
    }, []);

    const addComment = (comment: string) => {
        if (comment.trim()) {
            setComments([...comments, comment.trim()]);
        }
    };

    const addLink = (link: string) => {
        if (link.trim()) {
            setLinks([...links, link.trim()]);
        }
    };

    const createTask = async () => {
        if (!title.trim() || !date.trim()) {
            Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires.');
            return;
        }

        try {
            const task: Task = {
                title,
                priority,
                status,
                date,
                comments: comments.map((comment, index) => ({ id: `${index + 1}`, comment })),
                links: links.map((link, index) => ({ id: `${index + 1}`, link })),
                members: membersIds,
                progress,
            };

            await tasksApi.createtask(task);
            Alert.alert('Succès', 'Tâche créée avec succès.');
            navigation.navigate('Tasks');
        } catch (error) {
            console.error('Error creating task:', error);
            Alert.alert('Erreur', 'Une erreur est survenue lors de la création de la tâche.');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.label}>Titre de la tâche *</Text>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Entrez le titre"
            />

            <Text style={styles.label}>Priorité</Text>
            <Picker
                selectedValue={priority}
                style={styles.picker}
                onValueChange={(itemValue) => setPriority(itemValue)}
            >
                <Picker.Item label="Normale" value="normale" />
                <Picker.Item label="Urgente" value="urgent" />
            </Picker>

            <Text style={styles.label}>Statut</Text>
            <Picker
                selectedValue={status}
                style={styles.picker}
                onValueChange={(itemValue) => setStatus(itemValue)}
            >
                <Picker.Item label="En cours" value="en cours" />
                <Picker.Item label="À risque" value="at risk" />
                <Picker.Item label="Complétée" value="completed" />
            </Picker>

            <Text style={styles.label}>Date de la tâche *</Text>
            <TextInput
                style={styles.input}
                value={date}
                onChangeText={setDate}
                placeholder="Entrez la date (e.g., 2024-01-01)"
            />

            <Text style={styles.label}>Commentaires</Text>
            <TextInput
                style={styles.input}
                placeholder="Ajouter un commentaire"
                onSubmitEditing={(e) => addComment(e.nativeEvent.text)}
            />
            <Text>{comments.join(', ')}</Text>

            <Text style={styles.label}>Liens</Text>
            <TextInput
                style={styles.input}
                placeholder="Ajouter un lien"
                onSubmitEditing={(e) => addLink(e.nativeEvent.text)}
            />
            <Text>{links.join(', ')}</Text>

            <Text style={styles.label}>Membres</Text>
            <Picker
                selectedValue={selectedMemberId}
                style={styles.picker}
                onValueChange={(itemValue) => {
                    if (itemValue && !membersIds.includes(itemValue)) {
                        setMembersIds([...membersIds, itemValue]);
                    }
                }}
            >
                <Picker.Item label="Sélectionner un membre" value={null} />
                {members.map((member) => (
                    <Picker.Item key={member.id} label={member.name} value={member.id} />
                ))}
            </Picker>
            <Text>Membres sélectionnés: {membersIds.map((id) => members.find((m) => m.id === id)?.name).join(', ')}</Text>

            <Text style={styles.label}>Progression</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={String(progress)}
                onChangeText={(text) => setProgress(Number(text))}
                placeholder="Progression en %"
            />

            <TouchableOpacity style={styles.button} onPress={createTask}>
                <Text style={styles.buttonText}>Ajouter la tâche</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#F5F5F5' },
    label: { fontSize: 16, fontWeight: 'bold', marginTop: 10 },
    input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginTop: 5 },
    picker: { height: 50, marginTop: 5 },
    button: {
        backgroundColor: '#5DD9FC',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: { fontSize: 16, fontWeight: 'bold', color: '#FFF' },
});

export default AddTaskScreen;
