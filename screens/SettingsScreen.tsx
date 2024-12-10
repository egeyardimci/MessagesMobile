import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainTabParamList, RootStackParamList } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Feather';

type SettingsScreenProps = {
 navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

export default function SettingsScreen({ navigation }: SettingsScreenProps): JSX.Element {
 const handleLogout = async () => {
   Alert.alert(
     "Logout",
     "Are you sure you want to logout?",
     [
       {
         text: "Cancel",
         style: "cancel"
       },
       {
         text: "Logout",
         onPress: async () => {
           await AsyncStorage.removeItem("token");
           navigation.replace('Login');
         },
         style: 'destructive'
       }
     ]
   );
 };

 const renderSettingItem = (icon: string, title: string, onPress: () => void) => (
   <TouchableOpacity style={styles.settingItem} onPress={onPress}>
     <View style={styles.settingContent}>
       <Icon name={icon} size={22} color="#666" />
       <Text style={styles.settingText}>{title}</Text>
     </View>
     <Icon name="chevron-right" size={20} color="#999" />
   </TouchableOpacity>
 );

 return (
   <SafeAreaView style={styles.container}>
     <View style={styles.section}>
       {renderSettingItem('user', 'Profile', () => {navigation.navigate("Profile")})}
       {renderSettingItem('info', 'About', () => {navigation.navigate("About")})}
       <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
         <Icon name="log-out" size={22} color="#FF3B30" />
         <Text style={styles.logoutText}>Logout</Text>
       </TouchableOpacity>
     </View>
   </SafeAreaView>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#fff',
 },
 section: {
   paddingVertical: 15,
 },
 settingItem: {
   flexDirection: 'row',
   alignItems: 'center',
   justifyContent: 'space-between',
   paddingVertical: 12,
   paddingHorizontal: 15,
   backgroundColor: '#fff',
   borderBottomWidth: 1,
   borderBottomColor: '#eee',
 },
 settingContent: {
   flexDirection: 'row',
   alignItems: 'center',
 },
 settingText: {
   fontSize: 16,
   marginLeft: 15,
   color: '#333',
 },
 logoutButton: {
   flexDirection: 'row',
   alignItems: 'center',
   paddingVertical: 12,
   paddingHorizontal: 15,
   borderBottomWidth: 1,
   borderBottomColor: '#eee',
 },
 logoutText: {
   fontSize: 16,
   color: '#FF3B30',
   marginLeft: 15,
 },
});