import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
// import SignUpScreen from './SignUpScreen'; 
import ProjectScreen from '../screens/ProjectsScreen'; 
import TasksScreen from '../screens/Tasksscreen'; 
import MembersScreen from '../screens/Membersscreen'; 
import ProfilsScreen from '../screens/Profilsscreen'; 
import BottomBar from './BottomBar';
import AddMember from './AddMember';
import EditMember from './EditMember';
import AddTaskScreen from '../screens/AddTaskScreen';
import  TasksContext  from '../TasksContext'; 
import ForgotPasswordScreen from '../screens/Forgotpasswordscreen';
import SignUpScreen from '../screens/SignUpscreen';
import AddProjectScreen from'../screens/AddProjectScreen';


export type RootStackParamList = {
    Login: undefined;
    SignUp: undefined; 
    ForgotPassword: undefined; 
    Projects: undefined;
    Tasks: undefined;
    Members: undefined;
    Profils: undefined;
    AddMember: undefined;
    EditMember: undefined;
    AddTaskScreen: undefined;
    AddProjectScreen: undefined;
    
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
    return (
        <NavigationContainer>
            
                <Stack.Navigator initialRouteName="Login">
                    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Projects" component={BottomBar} options={{ headerShown: false }} />
                    <Stack.Screen name="AddMember" component={AddMember} />
                    <Stack.Screen name="EditMember" component={EditMember} options={{ headerShown: false }} />
                    <Stack.Screen name="Tasks" component={TasksScreen} />
                    <Stack.Screen name="AddTaskScreen" component={AddTaskScreen} />
                    <Stack.Screen name="AddProjectScreen" component={AddProjectScreen}/>
                </Stack.Navigator>
           
        </NavigationContainer>
    );
};

export default Navigation;
