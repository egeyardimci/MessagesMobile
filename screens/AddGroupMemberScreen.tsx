import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { friendsService } from '../services/FriendsService';
import { gruopsService } from '../services/GroupsService';


export default function AddGroupMemberScreen({ navigation,route }: any): JSX.Element {
  const [email, setEmail] = useState('');

  const handleAddGroupMember = async () => {
    try {
      if (!email.trim()) {
        Alert.alert('Error', 'Please enter an email adress');
        return;
      }
      const response = await gruopsService.addGroupMember(route.params.id,email);
      Alert.alert('Success', 'User added to the group!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to add user to the group');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Member</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter an email adress"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleAddGroupMember}>
        <Text style={styles.buttonText}>Add Member</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#000',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ddd',
      padding: 15,
      fontSize: 16,
      borderRadius: 6,
      marginBottom: 12,
      backgroundColor: '#fff',
    },
    textArea: {
      height: 100,
      textAlignVertical: 'top',
    },
    button: {
      backgroundColor: '#007AFF',
      padding: 15,
      borderRadius: 6,
      marginTop: 10,
    },
    buttonText: {
      color: '#fff',
      textAlign: 'center',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });