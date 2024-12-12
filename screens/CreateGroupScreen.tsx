import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Alert, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { gruopsService } from '../services/GroupsService';
import { useUser } from '../context/UserContext';

type CreateGroupScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'CreateGroup'>;
};

export default function CreateGroupScreen({ navigation }: CreateGroupScreenProps): JSX.Element {
  const [groupName, setGroupName] = useState('');
  const [email, setEmail] = useState('');
  const {userDetails} = useUser();
  const [members, setMembers] = useState<string[]>([userDetails?.email || '']);

  const handleAddMember = () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter an email address');
      return;
    }


    if (members.includes(email.trim())) {
      Alert.alert('Error', 'This email is already added');
      return;
    }

    setMembers([...members, email.trim()]);
    setEmail('');
  };

  const handleRemoveMember = (emailToRemove: string) => {
    setMembers(members.filter(email => email !== emailToRemove));
  };

  const handleCreateGroup = async () => {
    try {
      if (!groupName.trim()) {
        Alert.alert('Error', 'Please enter a group name');
        return;
      }

      if (members.length === 0) {
        Alert.alert('Error', 'Please add at least one member');
        return;
      }

      // Add your API call here
      gruopsService.createGroup(groupName, members);
      Alert.alert('Success', 'Group created!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to create group');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Create Group</Text>
      <TextInput
        style={styles.input}
        placeholder="Group name"
        value={groupName}
        onChangeText={setGroupName}
      />
      
      <View style={styles.emailContainer}>
        <TextInput
          style={[styles.input, styles.emailInput]}
          placeholder="Add member email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TouchableOpacity 
          style={styles.addButton} 
          onPress={handleAddMember}
        >
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {members.length > 0 && (
        <View style={styles.membersContainer}>
          <Text style={styles.membersTitle}>Members to be added:</Text>
          {members.map((memberEmail, index) => (
            <View key={index} style={styles.memberRow}>
              <Text style={styles.memberEmail}>{memberEmail}</Text>
              {memberEmail === userDetails?.email ? null : (
              <TouchableOpacity
                onPress={() => handleRemoveMember(memberEmail)}
                style={styles.removeButton}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>)}
            </View>
          ))}
        </View>
      )}

      <TouchableOpacity style={styles.createButton} onPress={handleCreateGroup}>
        <Text style={styles.buttonText}>Create Group</Text>
      </TouchableOpacity>
    </ScrollView>
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
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  emailInput: {
    flex: 1,
    marginBottom: 0,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 6,
    width: 80,
  },
  addButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  membersContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  membersTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  memberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  memberEmail: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
 removeButton: {
   backgroundColor: '#007AFF',
   paddingHorizontal: 15,
   paddingVertical: 8,
   borderRadius: 6,
 },
 removeButtonText: {
   color: '#fff',
   fontSize: 14,
   fontWeight: '500',
 },
  createButton: {
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