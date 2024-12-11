// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import MessagesScreen from './screens/MessagesScreen';
import MainTabs from './navigation/MainTabs';
import AddFriendScreen from './screens/AddFriendScreen';
import CreateGroupScreen from './screens/CreateGroupScreen';
import ConversationScreen from './screens/ConversationScreen';
import AboutScreen from './screens/AboutScreen';
import ProfileScreen from './screens/ProfileScreen';
import { UserProvider } from './context/UserContext';
import FriendRequestsScreen from './screens/FriendRequestsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <UserProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen 
          name="AddFriend" 
          component={AddFriendScreen}
          options={{
            title: 'Add Friend',
            headerTintColor: '#007AFF',
          }}
        />
        <Stack.Screen 
          name="CreateGroup" 
          component={CreateGroupScreen}
          options={{
            title: 'Create Group',
            headerTintColor: '#007AFF',
          }}
        />
        <Stack.Screen 
          name="Conversation" 
          component={ConversationScreen}
          options={({ route }) => ({
            // @ts-ignore
            title: route.params?.name || 'Chat',
            headerTintColor: '#007AFF',
          })}
        />
        <Stack.Screen 
          name="About" 
          component={AboutScreen}
          options={{
            title: 'About',
            headerTintColor: '#007AFF',
          }}
        />
        <Stack.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          title: 'Profile',
          headerTintColor: '#007AFF',
        }}
      />
        <Stack.Screen 
        name="FriendRequests" 
        component={FriendRequestsScreen}
        options={{
          title: 'Friend Requests',
          headerTintColor: '#007AFF',
        }}
      />
      </Stack.Navigator>
    </NavigationContainer>
    </UserProvider>
  );
}
