import { View, Text } from 'react-native'
import Icons from 'react-native-vector-icons/FontAwesome';

import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import TasksScreen from '../screens/Tasksscreen'
import MembersScreen from '../screens/Membersscreen'
import ProfilsScreen from '../screens/Profilsscreen'
import ProjectsScreen from '../screens/ProjectsScreen'

const BottomBar = () => {
    const Tabs = createBottomTabNavigator()
  return (
            <Tabs.Navigator screenOptions={{headerShown:false}}>
                <Tabs.Screen component={ProjectsScreen} name='projects' 
                options={{
                  tabBarIcon: ({color, size}) => (
                  <Icons name='bar-chart' color={"#000000"} size={20} />
                  )
                }}/>
                <Tabs.Screen name="Tasks" component={TasksScreen}
                options={{
                  tabBarIcon: ({color, size}) =>(
                    <Icons name ='tasks' color={"#000000"} size={20} />
                  )
                }}

            />
                <Tabs.Screen name="Members" component={MembersScreen} 
                options={{
                  tabBarIcon: ({color, size}) =>(
                    <Icons name ='group' color={"#000000"} size={20} />
                  )
                }} />
                <Tabs.Screen name="Profils" component={ProfilsScreen} 
                options={{
                  tabBarIcon: ({color, size}) =>(
                    <Icons name ='user' color={"#000000"} size={20} />
                  )
                }} />
            </Tabs.Navigator>
  )
}

export default BottomBar