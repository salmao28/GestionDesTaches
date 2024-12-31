import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions, Image, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { createStackNavigator } from '@react-navigation/stack';

const data = [
  { id: '1', title: 'WAWASHI', progress: '90%', color: '#9C27B0', image: require('../assets/project.png') },
  { id: '2', title: 'escodeve academy', progress: '0%', color: '#03A9F4', image: require('../assets/projet2.png') },
];

const chartData = {
  labels: ['MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV'], 
  datasets: [
    {
      data: [0, 10, 15, 25, 40, 52, 60, 71, 79], 
      color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`, 
      strokeWidth: 3, 
    },
  ],
};

const ProjectsScreen = ({ navigation }: { navigation: any }) => {
  const renderCard = ({ item }: { item: { title: string; progress: string; color: string; image: any } }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.cardImage} />
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardProgress}>{item.progress} Completed</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
      <Text style={styles.sectionTitle}>Projects</Text>
      <FlatList
        data={data}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('AddProjectScreen')}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      <View style={styles.metricsContainer}>
        <View style={styles.metricCard}>
          <Text style={styles.metricTitle}>wawashi total working time</Text>
          <Text style={styles.metricValue}>9 months</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricTitle}> wawashi total task activity</Text>
          <Text style={styles.metricValue}>5 Tasks</Text>
        </View>
      </View>

      <View style={styles.metricsContainer}>
        <View style={styles.metricCard}>
          <Text style={styles.metricTitle}>escodeve academy total working time</Text>
          <Text style={styles.metricValue}> months</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricTitle}>escodeve academy total tasks activity</Text>
          <Text style={styles.metricValue}>2 Tasks</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}> wawashi Progress Over Time</Text>
      <LineChart
        data={chartData}
        width={Dimensions.get('window').width - 40} 
        height={300}
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#f5f5f5',
          backgroundGradientTo: '#fff',
          decimalPlaces: 0, 
          color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '5',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        bezier 
        style={{
          marginVertical: 20,
          borderRadius: 16,
        }}
      />
    </ScrollView>
  );
};

const AddProjectScreen = () => (
  <View style={styles.addProjectContainer}>
    <Text style={styles.sectionTitle}>Add a New Project</Text>
  </View>
);
const Stack = createStackNavigator();

const ProjectNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="ProjectsScreen" component={ProjectsScreen} options={{ title: 'Projects' }} />
    <Stack.Screen name="AddProjectScreen" component={AddProjectScreen} options={{ title: 'Add Project' }} />
  </Stack.Navigator>
);

export default ProjectNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  card: {
    flex: 1,
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    alignItems: 'center',
  },
  cardImage: {
    width: '100%',
    height: Dimensions.get('window').width / 2 - 60,
    borderRadius: 10,
  },
  cardInfo: {
    paddingTop: 10,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  cardProgress: {
    fontSize: 14,
    color: '#666',
  },
  fab: {
    position: 'absolute',
    bottom: 40, 
    right: 20, 
    backgroundColor: '#03A9F4',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  fabText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  metricCard: {
    flex: 1,
    marginHorizontal: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    alignItems: 'center',
  },
  metricTitle: {
    fontSize: 14,
    color: '#555',
  },
  metricValue: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  addProjectContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
