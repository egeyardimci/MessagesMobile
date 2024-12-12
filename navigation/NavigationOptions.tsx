import { StackNavigationOptions } from '@react-navigation/stack';
import { TouchableOpacity, Text, View, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';

const commonHeaderOptions = {
 headerStyle: {
   elevation: 0,
   shadowOpacity: 0,
   borderBottomWidth: 1,
   borderBottomColor: '#f0f0f0',
 },
 headerTintColor: '#007AFF',
 headerTitleStyle: {
   color: '#007AFF',
 },
};

export const groupsScreenOptions = ({ navigation }: any): BottomTabNavigationOptions => ({
 ...commonHeaderOptions,
 tabBarIcon: ({ color, size }) => (
   <Icon name="users" size={size} color={color} />
 ),
 headerRight: () => (
   <TouchableOpacity 
     onPress={() => {
      navigation.push("CreateGroup")
     }} 
     style={{ marginRight: 15 }}
   >
     <Icon name="plus" size={24} color="#007AFF" />
   </TouchableOpacity>
 ),
});

export const friendsScreenOptions = ({ navigation }: any): BottomTabNavigationOptions => ({
 ...commonHeaderOptions,
 tabBarIcon: ({ color, size }) => (
   <Icon name="user-plus" size={size} color={color} />
 ),
 headerRight: () => (
  <View style ={styles.container}>
   <TouchableOpacity 
     onPress={() => {
      navigation.push("FriendRequests")
     }} 
     style={{ marginRight: 15 }}
   >
     <Icon name="inbox" size={24} color="#007AFF" />
   </TouchableOpacity>
   <TouchableOpacity 
     onPress={() => {
      navigation.push("AddFriend")
     }} 
     style={{ marginRight: 15 }}
   >
     <Icon name="plus" size={24} color="#007AFF" />
   </TouchableOpacity>
   </View>
 ),
});

export const messagesScreenOptions = ({ navigation }: any): BottomTabNavigationOptions => ({
 ...commonHeaderOptions,
 tabBarIcon: ({ color, size }) => (
   <Icon name="message-circle" size={size} color={color} />
 ),
});

export const settingsScreenOptions = ({ navigation }: any): BottomTabNavigationOptions => ({
 ...commonHeaderOptions,
 tabBarIcon: ({ color, size }) => (
   <Icon name="settings" size={size} color={color} />
 ),
});

export const membersScreenOptions = ({ navigation ,route }: any): StackNavigationOptions => ({
  title: route.params?.name + " Members" || 'Group Members',
  headerTintColor: '#007AFF',
 });

 export const conversationScreenOptions = ({ navigation ,route }: any): StackNavigationOptions => ({
    headerTintColor: '#007AFF',
    headerTitle: () => {
      if(route.params?.isGroup){
        return(
          <Pressable 
            onPress={() => navigation.navigate('Members', {name: route.params?.name , id:route.params?.id, isGroup: route.params?.isGroup})}
          >
            <Text style={{ fontSize: 20, fontWeight: 600, color: '#007AFF' }}>
              {route.params?.name || 'Chat'}
            </Text>
          </Pressable>
          )
      }
      else{
        return(
          <Text style={{ fontSize: 20, fontWeight: 600, color: '#007AFF' }}>
          {route.params?.name || 'Chat'}
        </Text>
        )
      }
    },
 });

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: '#fff',
  },
});