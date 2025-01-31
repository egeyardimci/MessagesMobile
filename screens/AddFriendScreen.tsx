import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { friendsService } from '../services/FriendsService';

type AddFriendScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'AddFriend'>;
};

export default function AddFriendScreen({ navigation }: AddFriendScreenProps): JSX.Element {
  const [email, setEmail] = useState('');

  const handleAddFriend = async () => {
    try {
      if (!email.trim()) {
        Alert.alert('Error', 'Please enter an email adress');
        return;
      }

      const friendRequestData:FriendRequestData = {email:email}
      const response = await friendsService.sendFriendRequest(friendRequestData);
      Alert.alert('Success', 'Friend request sent!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to send friend request');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Friend</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter an email adress"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleAddFriend}>
        <Text style={styles.buttonText}>Send Friend Request</Text>
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