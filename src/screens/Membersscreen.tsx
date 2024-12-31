import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../components/Navigation';
import { memberApi } from '../services/membersServices';

type Member = { 
  id: number;
  name: string;
  role: string;
  email: string;
};

const deleteMember = async (id: string) => {
  try {
    const convertedId = Number(id);
    const data = await memberApi.deletemember(convertedId);
    console.log('Delete response:', data);
  } catch (error) {
    console.log('Error: ', error);
  }
};

const MembersScreen = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [expandedMemberId, setExpandedMemberId] = useState<number | null>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await memberApi.getAll();
        setMembers(data.data || data);
      } catch (error) {
        console.log('Error: ', error);
      }
    };

    fetchMembers();
  }, []);

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleEdit = (id: number) => {
    navigation.navigate('EditMember', { id });
  };

  const handleDelete = (id: number) => {
    Alert.alert(
      'Delete Member',
      'Are you sure you want to delete this member?',
      [
        { text: 'Cancel' },
        { text: 'Delete', onPress: () => deleteMember(id.toString()) },
      ],
      { cancelable: true }
    );
  };

  const toggleExpand = (id: number) => {
    setExpandedMemberId(expandedMemberId === id ? null : id);
  };

  const renderMember = ({ item }: { item: Member }) => {
    const isExpanded = expandedMemberId === item.id;

    return (
      <TouchableOpacity onPress={() => toggleExpand(item.id)} style={styles.memberCard}>
        <Text style={styles.memberName}>{item.name}</Text>
        <Text style={styles.memberRole}>{item.role}</Text>
        <Text style={styles.memberEmail}>📧 {item.email}</Text>

        {isExpanded && (
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => handleEdit(item.id)}
            >
              <Text style={styles.buttonText}>Modify</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDelete(item.id)}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Members</Text>

      <FlatList
        data={members}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMember}
        contentContainerStyle={styles.list}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddMember')}
      >
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
  list: {
    paddingBottom: 20,
  },
  memberCard: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  memberName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  memberRole: {
    fontSize: 14,
    color: '#777',
  },
  memberEmail: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  deleteButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#5DD9FC',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

export default MembersScreen;
