import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';


const AddProjectScreen = () => {
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [progress, setProgress] = useState('');
  const [color, setColor] = useState('');
  const [image, setImage] = useState('');

  const handleAddProject = () => {
    if (!id || !title || !progress || !color || !image) {
      Alert.alert('Erreur', 'Tous les champs sont obligatoires.');
      return;
    }

    const newProject = {
      id,
      title,
      progress,
      color,
      image,
    };

    console.log('Nouveau projet ajouté :', newProject);

    // Réinitialiser les champs après l'ajout du projet
    setId('');
    setTitle('');
    setProgress('');
    setColor('');
    setImage('');
    Alert.alert('Succès', 'Projet ajouté avec succès');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Ajouter un Nouveau Projet</Text>

      <TextInput
        style={styles.input}
        placeholder="ID du projet"
        value={id}
        onChangeText={setId}
      />
      <TextInput
        style={styles.input}
        placeholder="Titre du projet"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Progression (%)"
        value={progress}
        onChangeText={setProgress}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Couleur (code hexadécimal, ex: #03A9F4)"
        value={color}
        onChangeText={setColor}
      />
      <TextInput
        style={styles.input}
        placeholder="Lien de l'image"
        value={image}
        onChangeText={setImage}
      />

      <TouchableOpacity style={styles.button} onPress={handleAddProject}>
        <Text style={styles.buttonText}>Ajouter le Projet</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingLeft: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#03A9F4',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddProjectScreen;
