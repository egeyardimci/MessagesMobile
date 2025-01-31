import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosInstance, AxiosStatic } from 'axios';

const API_URL = 'http://10.0.2.2:8080';

export const publicApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout:3000,
});

let secureApiInstance: AxiosInstance | null = null;

export const secureApi = async () => {
  try {
    if (secureApiInstance) return secureApiInstance;

    const token = await AsyncStorage.getItem("token");
    if (!token) return null;
    
    secureApiInstance = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    });
    
    return secureApiInstance;
  } catch (error) {
    console.error('Error creating secure API instance:', error);
    return null;
  }
};

export const clearSecureApi = () => {
  secureApiInstance = null;
};