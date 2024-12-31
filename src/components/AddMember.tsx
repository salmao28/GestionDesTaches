import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMembers } from '../MembersContext';
import { memberApi } from '../services/membersServices';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './Navigation';




interface  Member  {
    name: string;
    role: string;
    email: string;
  };
  


const AddMember = () => {
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
  



  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();


  const createmember = async( name: string, role: string, email: string) => {
      try {

        const member : Member = {
            name: name,
            role: role,
            email: email
        }

          // const convertedId =(member.id)
          const data = await memberApi.creatmember(member)
          Alert.alert("member created")
          navigation.navigate('Members')
          console.log(data)
      } catch (error) {
          console.log("error", error)
      }
  }


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add Member</Text>

            <Text style={styles.label}>Name</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter name"
                value={name}
                onChangeText={setName}
            />

            <Text style={styles.label}>Role</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter role"
                value={role}
                onChangeText={setRole}
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
             style={styles.input}
             placeholder="Enter email"
             value={email}
             onChangeText={setEmail}
             keyboardType="email-address"
         />

         <TouchableOpacity style={styles.addButton} onPress={() => createmember( name, role, email )}>
             <Text style={styles.addButtonText}>Add Member</Text>
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
    addButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFF',
    },
});

export default AddMember;