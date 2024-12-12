import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MessagesScreen from './MessagesScreen';
import { MainTabParamList } from '../types';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import { friendsScreenOptions, groupsScreenOptions, messagesScreenOptions, settingsScreenOptions } from '../navigation/NavigationOptions';
import GroupsScreen from './GroupsScreen';
import FriendsScreen from './FriendsScreen';
import SettingsScreen from './SettingsScreen';
import { UserDetails } from '../context/ContextTypes';
import { userService } from '../services/UserService';
import { useUser } from '../context/UserContext';

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function HomeScreen() {

  const {setUserDetails} = useUser();

  useEffect(() => {
    //fetch user data
    const fetchUserDetails = async (): Promise<void> => {
      try {
        const user:UserDetails = await userService.fetchUserDetails();
        setUserDetails(user);
      } catch (error) {
        console.log(error);
      }
    }

    fetchUserDetails();

  }, []);


  return (
    <Tab.Navigator>
        <Tab.Screen 
        name="Messages" 
        component={MessagesScreen}
        options={messagesScreenOptions}
      />
      <Tab.Screen 
        name="Groups" 
        component={GroupsScreen}
        options={groupsScreenOptions}
      />
      <Tab.Screen 
        name="Friends" 
        component={FriendsScreen}
        options={friendsScreenOptions}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={settingsScreenOptions}
      />
    </Tab.Navigator>
  );
}