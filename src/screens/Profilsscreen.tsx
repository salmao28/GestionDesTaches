import React, { useState } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Modal } from 'react-native';

const ProfilsScreen = () => {
    const [profileData, setProfileData] = useState({
        name: 'Salma MOUSSAOUI',    
        email: 'salma1234@gmail.com',
        role: 'mobile Developer',
        avatarUrl: 'https://via.placeholder.com/150',
        stats: {
            tasksCompleted: 4,
            projects: 5,
            badges: 3,
        },
        activity: [
            { type: 'task', title: "Finalisé la tâche 'API Backend'", date: '2024-12-05' },
            { type: 'project', title: "application mobile  ", date: '2024-12-05' },
        ],
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState({ ...profileData });

    const handleSave = () => {
        setProfileData(editedData);
        setIsEditing(false);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Avatar */}
            
            <Image source={require('../assets/profile.png')} style={styles.avatar} />

            {/* Profil de base */}
            <Text style={styles.name}>{profileData.name}</Text>
            <Text style={styles.email}>{profileData.email}</Text>
            <Text style={styles.role}>{profileData.role}</Text>

            {/* Statistiques */}
            <View style={styles.statsContainer}>
                <View style={styles.statBox}>
                    <Text style={styles.statNumber}>{profileData.stats.tasksCompleted}</Text>
                    <Text style={styles.statLabel}>Tâches</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={styles.statNumber}>{profileData.stats.projects}</Text>
                    <Text style={styles.statLabel}>Projets</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={styles.statNumber}>{profileData.stats.badges}</Text>
                    <Text style={styles.statLabel}>Badges</Text>
                </View>
            </View>

            {/* Activité récente */}
            <View style={styles.activityContainer}>
                <Text style={styles.sectionTitle}>Activité récente</Text>
                {profileData.activity.map((item, index) => (
                    <View key={index} style={styles.activityItem}>
                        <Text style={styles.activityText}>
                            {item.title} - <Text style={styles.activityDate}>{item.date}</Text>
                        </Text>
                    </View>
                ))}
            </View>

            {/* Bouton Modifier le Profil */}
            <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
                <Text style={styles.editButtonText}>Modifier le Profil</Text>
            </TouchableOpacity>

            {/* Modal de modification */}
            {isEditing && (
                <Modal transparent={true} animationType="slide" visible={isEditing}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Modifier le Profil</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Nom"
                                value={editedData.name}
                                onChangeText={(text) => setEditedData({ ...editedData, name: text })}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                value={editedData.email}
                                onChangeText={(text) => setEditedData({ ...editedData, email: text })}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Rôle"
                                value={editedData.role}
                                onChangeText={(text) => setEditedData({ ...editedData, role: text })}
                            />
                            <View style={styles.modalButtons}>
                                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                                    <Text style={styles.saveButtonText}>Enregistrer</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.cancelButton} onPress={() => setIsEditing(false)}>
                                    <Text style={styles.cancelButtonText}>Annuler</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#F5F5F5',
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    email: {
        fontSize: 16,
        color: '#555',
        marginBottom: 5,
    },
    role: {
        fontSize: 16,
        color: '#777',
        marginBottom: 20,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 20,
    },
    statBox: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    statLabel: {
        fontSize: 14,
        color: '#777',
    },
    activityContainer: {
        width: '100%',
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    activityItem: {
        marginBottom: 10,
    },
    activityText: {
        fontSize: 16,
        color: '#555',
    },
    activityDate: {
        fontSize: 14,
        color: '#999',
    },
    editButton: {
        backgroundColor: '#5DD9FC',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
        marginTop: 20,
    },
    editButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#DDD',
        marginBottom: 15,
        fontSize: 16,
        padding: 5,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    saveButton: {
        backgroundColor: '#5DD9FC',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginRight: 10,
    },
    saveButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    cancelButton: {
        backgroundColor: '#FF6B6B',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    cancelButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
});

export default ProfilsScreen;
