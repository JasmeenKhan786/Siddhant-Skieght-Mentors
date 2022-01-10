import React from 'react';
import {Image} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Login from '../screens/Login'
import Dashboard from '../screens/Dashboard'
import Profile from '../screens/Profile'
import SignUp from '../screens/SignUp'
import LoadingScreen from '../screens/LoadingScreen'
import Reset from '../screens/Reset'
import MyRequests from '../screens/MyRequests'
import MyMentees from '../screens/MyMentees'
import MenteeAssignments from '../screens/MenteeAssignments'


const Stack1 = createStackNavigator();

const MyMentee = () => {
  return (
    <Stack1.Navigator screenOptions={{ headerShown: false }}>
      <Stack1.Screen name="MyMentees" component={MyMentees} />
           <Stack1.Screen name="MenteeAssignments" component={MenteeAssignments} />
    </Stack1.Navigator>
  );
};



const Tab = createMaterialBottomTabNavigator();

const TabContent = () => {
  return (
    <Tab.Navigator
    initialRouteName="Dashboard" 
  activeColor="#fff"
  inactiveColor="#3e2465" 
  labeled={true}
  barStyle={{ backgroundColor: '#3D4EAF' }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
         return <Image style={{width:20,height:20}}source={require('../assets/home.png')} />;
          } else if (route.name === 'MyRequests') {
       return <Image style={{width:20,height:20}}source={require('../assets/connect.png')} />;
          } else if (route.name === 'Profile') {
        return <Image style={{width:20,height:20}}source={require('../assets/man-user.png')} />;
          } else if (route.name === 'MyMentees') {
          return <Image style={{width:20,height:20}}source={require('../assets/approve.png')} />;
          }

          
        },
       
      })}>
     
  <Tab.Screen
        name="Dashboard"
        component={Dashboard}
      />
      <Tab.Screen
        name="MyRequests" 
        component={MyRequests}
      />
      <Tab.Screen
        name="MyMentees"
        component={MyMentee}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
};

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator>
     <Stack.Screen
        name="Loading"
        component={LoadingScreen}
        options={{ headerShown: false }}
      /> 

      <Stack.Screen 
        name="Dashboard"
        component={TabContent}
        options={{ headerShown: false }}
      />
      
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="Reset"
        component={Reset}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
