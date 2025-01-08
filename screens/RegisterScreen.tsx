import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { authService } from '../services/AuthService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoadingSpinner } from '../components/LoadingSpinner';

type RegisterScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Register'>;
};

export default function RegisterScreen({ navigation }: RegisterScreenProps): JSX.Element {
  const [name, setName] = useState<string>('');
  const [lastname, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [loading,setLoading] = useState(false);

  const handleRegister = async (): Promise<void> => {
    try {
      setLoading(true);
      if (!name || !email || !password || !confirmPassword) {
        Alert.alert('Error', 'Please fill in all fields');
        return;
      }
      if (password !== confirmPassword) {
        Alert.alert('Error', 'Passwords do not match');
        return;
      }
  
      const response = await authService.register({ name,lastname, email, password });
      Alert.alert(
        'User Created!',
        'User successfully createad navigate to the login page and, login to the app.'
      )
      navigation.replace('Login');
    } catch (error:any) {
      Alert.alert(
        'Error',
        error.response?.data?.message || 'An error occurred during registration'
      );
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.appTitle}>Howyoudoin</Text>
        <Text style={styles.appSubtitle}>Connect with friends</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastname}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => navigation.replace("Login")}
      >
        <Text style={styles.linkText}>Already have an account? Login</Text>
      </TouchableOpacity>
      {loading && <LoadingSpinner></LoadingSpinner>}
    </View>
  );
}

  
const styles = StyleSheet.create({
    titleContainer: {
      alignItems: 'center',
      marginBottom: 50,
    },
    appTitle: {
      fontSize: 42,
      fontWeight: 'bold',
      color: '#007AFF',
      marginBottom: 10,
      // Add a subtle text shadow
      textShadowColor: 'rgba(0, 122, 255, 0.15)',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 10,
    },
    appSubtitle: {
      fontSize: 16,
      color: '#666',
      fontWeight: '500',
    },
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 30,
      textAlign: 'center',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ddd',
      padding: 15,
      fontSize: 16,
      borderRadius: 6,
      marginBottom: 12,
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
    linkButton: {
      marginTop: 15,
    },
    linkText: {
      color: '#007AFF',
      textAlign: 'center',
      fontSize: 16,
    },
  });