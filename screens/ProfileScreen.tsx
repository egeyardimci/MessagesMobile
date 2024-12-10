// screens/ProfileScreen.tsx
import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const mockUserData = {
 firstName: 'John',
 lastName: 'Doe',
 email: 'john.doe@example.com',
};

export default function ProfileScreen() {
 const renderInfoItem = (icon: string, label: string, value: string) => (
   <View style={styles.infoItem}>
     <View style={styles.labelContainer}>
       <Icon name={icon} size={20} color="#666" />
       <Text style={styles.label}>{label}</Text>
     </View>
     <Text style={styles.value}>{value}</Text>
   </View>
 );

 return (
   <ScrollView style={styles.container}>
     <View style={styles.header}>
       <View style={styles.avatarContainer}>
         <View style={styles.avatar}>
           <Text style={styles.avatarText}>
             {mockUserData.firstName[0]}{mockUserData.lastName[0]}
           </Text>
         </View>
       </View>
       <Text style={styles.name}>
         {mockUserData.firstName} {mockUserData.lastName}
       </Text>
     </View>

     <View style={styles.section}>
       <Text style={styles.sectionTitle}>Personal Information</Text>
       {renderInfoItem('user', 'First Name', mockUserData.firstName)}
       {renderInfoItem('user', 'Last Name', mockUserData.lastName)}
       {renderInfoItem('mail', 'Email', mockUserData.email)}
     </View>
   </ScrollView>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#fff',
 },
 header: {
   alignItems: 'center',
   padding: 20,
   borderBottomWidth: 1,
   borderBottomColor: '#eee',
 },
 avatarContainer: {
   marginBottom: 10,
 },
 avatar: {
   width: 80,
   height: 80,
   borderRadius: 40,
   backgroundColor: '#007AFF',
   justifyContent: 'center',
   alignItems: 'center',
 },
 avatarText: {
   color: '#fff',
   fontSize: 32,
   fontWeight: 'bold',
 },
 name: {
   fontSize: 24,
   fontWeight: 'bold',
   color: '#333',
 },
 section: {
   padding: 20,
 },
 sectionTitle: {
   fontSize: 18,
   fontWeight: 'bold',
   marginBottom: 15,
   color: '#333',
 },
 infoItem: {
   flexDirection: 'row',
   justifyContent: 'space-between',
   alignItems: 'center',
   paddingVertical: 12,
   borderBottomWidth: 1,
   borderBottomColor: '#eee',
 },
 labelContainer: {
   flexDirection: 'row',
   alignItems: 'center',
 },
 label: {
   fontSize: 16,
   color: '#666',
   marginLeft: 10,
 },
 value: {
   fontSize: 16,
   color: '#333',
 },
});