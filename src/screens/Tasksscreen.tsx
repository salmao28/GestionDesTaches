import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Bar as ProgressBar } from 'react-native-progress';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../components/Navigation';
import { tasksApi } from '../services/tasksServices';
import { memberApi } from '../services/membersServices';

interface Comment {
  id: string;
  comment: string;
}

interface Link {
  id: string;
  link: string;
}

interface Task {
  id: number | string;
  title: string;
  priority: 'urgent' | 'normale' | string;
  date: string;
  comments: Comment[];
  links: Link[];
  members: string[];
  progress: number;
  memberNames: string[];
}

const TasksScreen = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await tasksApi.getall();
        const tasksData = response.data;
        const tasksWithCounts = await Promise.all(
          tasksData.map(async (task: Task) => {
            const memberNames = await Promise.all(
              (task.members || []).map(async (memberId: string) => {
                try {
                  const member = await memberApi.getmember(memberId);
                  return member?.data.name || 'Unknown Member';
                } catch (err) {
                  console.error(`Error fetching member with ID ${memberId}:`, err);
                  return 'Unknown Member';
                }
              })
            );
            return {
              ...task,
              comments: task.comments || [],
              links: task.links || [],
              members: task.members || [],
              memberNames,
            };
          })
        );
        
        const sortedTasks = tasksWithCounts.sort((a, b) => {
          if (a.priority === 'urgent' && b.priority !== 'urgent') return -1;
          if (a.priority !== 'urgent' && b.priority === 'urgent') return 1;
          return 0;
        });
        setTasks(sortedTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const deleteTask = async (id: string) => {
    try {
      const data = await tasksApi.deletetask(id);
      console.log('Delete response:', data);
    } catch (error) {
      console.log('Error: ', error);
    }
  }


  const handleDelete = (id: number | string) => {
    Alert.alert(
      'Supprimer la tâche',
      'Êtes-vous sûr de vouloir supprimer cette tâche ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: () => {
            deleteTask(id as string)
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
            console.log('Task deleted:', id);
          },
        },
      ]
    );
  };

  const handleEdit = (task: Task) => {
    navigation.navigate('EditTaskScreen', { task });
  };

  const updateProgress = (taskId: number | string, increment: boolean) => {
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id === taskId) {
          const newProgress = increment
            ? Math.min(task.progress + 0.1, 1)
            : Math.max(task.progress - 0.1, 0);
          return { ...task, progress: newProgress };
        }
        return task;
      });
    });
  };

  const handleTaskSelect = (task: Task) => {
    if (selectedTask?.id === task.id) {
      setSelectedTask(null);
    } else {
      setSelectedTask(task);
    }
  };

  const renderTask = ({ item }: { item: Task }) => (
    <TouchableOpacity
      style={[styles.taskCard, item.priority === 'urgent' ? styles.highlightedCard : null]}
      onPress={() => handleTaskSelect(item)} 
    >
      <View style={styles.taskHeader}>
        <View style={styles.taskTitleContainer}>
          <Text style={styles.taskTitle}>{item.title}</Text>
        </View>
      </View>
      <View style={styles.taskFooter}>
        <Text style={styles.taskDate}>📅 {item.date}</Text>
        <View style={styles.taskMeta}>
           <TouchableOpacity
            onPress={() => navigation.navigate('CommentsScreen', { taskId: item.id, comments: item.comments })}
          >
            <Text>💬 {item.comments.length}</Text>
          </TouchableOpacity> 
          <Text>🔗 {item.links.length}</Text>
          <Text>👤 {item.members.length}</Text>
        </View>
      </View>
      <View style={styles.progressContainer}> 
        <Text style={styles.progressLabel}>Avancement : {(item.progress * 100).toFixed(0)}%</Text>
        <ProgressBar progress={item.progress} color="#4CAF50" style={styles.progressBar} />
        <View style={styles.progressButtons}>
          <TouchableOpacity
            style={styles.progressButton}
            onPress={() => updateProgress(item.id, false)}
          >
            <Text style={styles.progressButtonText}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.progressButton}
            onPress={() => updateProgress(item.id, true)}
          >
            <Text style={styles.progressButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      {selectedTask?.id === item.id && ( 
        <View style={styles.expandedContent}>
          <View style={styles.linksContainer}>
            {item.links.map((link) => (
              <Text key={link.id} style={styles.link}>{link.link}</Text>
            ))}
          </View>
          <View style={styles.commentsContainer}>
            {item.comments.map((comment) => (
              <Text key={comment.id} style={styles.comment}>{comment.comment}</Text>
            ))}
          </View>
          <View style={styles.membersContainer}>
            {item.memberNames.map((name, index) => (
              <Text key={index} style={styles.memberName}>👤 {name}</Text>
            ))}
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[styles.actionButton, styles.editButton]}
              onPress={() => handleEdit(item)}
            >
              <Text style={styles.actionText}>Modifier</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.deleteButton]}
              onPress={() => handleDelete(item.id)}
            >
              <Text style={styles.actionText}>Supprimer</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}> wawashi Liste des Tâches</Text>
      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.taskList}
      />
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('AddTaskScreen')}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginVertical: 20, color: '#333' },
  taskList: { padding: 10 },
  taskCard: { backgroundColor: '#fff', borderRadius: 10, padding: 15, marginBottom: 10, elevation: 2 },
  highlightedCard: { borderWidth: 2, borderColor: '#FF5722' },
  taskHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  taskTitleContainer: { flex: 1, justifyContent: 'center' },
  taskTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  taskFooter: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  taskDate: { fontSize: 14, color: '#555' },
  taskMeta: { flexDirection: 'row', justifyContent: 'space-between', width: 120 },
  progressContainer: { marginTop: 10 },
  progressLabel: { fontSize: 12, marginBottom: 5, color: '#555' },
  progressBar: { height: 8, borderRadius: 4 },
  progressButtons: { flexDirection: 'row', marginTop: 5 },
  progressButton: { 
    backgroundColor: '#03A9F4', 
    paddingVertical: 6, 
    paddingHorizontal: 12, 
    borderRadius: 5, 
    marginHorizontal: 5 
  },
  progressButtonText: { color: '#fff', fontSize: 14 },
  membersContainer: { marginTop: 10 },
  memberName: { fontSize: 14, color: '#333', marginVertical: 2 },
  expandedContent: { marginTop: 10 },
  linksContainer: { marginBottom: 10 },
  link: { fontSize: 14, color: '#03A9F4' },
  commentsContainer: { marginBottom: 10 },
  comment: { fontSize: 14, color: '#555' },
  buttonsContainer: { marginTop: 10 },
  actionButton: { padding: 10, borderRadius: 5, marginBottom: 10 },
  editButton: { backgroundColor: '#03A9F4' },
  deleteButton: { backgroundColor: '#F44336' },
  actionText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  fab: { position: 'absolute', bottom: 20, right: 20, backgroundColor: '#03A9F4', width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', elevation: 5 },
  fabText: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
});

export default TasksScreen;
