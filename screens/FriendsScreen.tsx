import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, FlatList, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainTabParamList, RootStackParamList } from '../types';

type Friend = {
 id: string;
 name: string;
 status: 'online' | 'offline';
 lastSeen?: string;
 avatar: string;
};

const mockFriends: Friend[] = [
 {
   id: '1',
   name: 'John Smith',
   status: 'online',
   avatar: 'https://via.placeholder.com/50'
 },
 {
   id: '2',
   name: 'Emma Wilson',
   status: 'offline',
   lastSeen: '2 hours ago',
   avatar: 'https://via.placeholder.com/50'
 },
 {
   id: '3',
   name: 'Michael Brown',
   status: 'online',
   avatar: 'https://via.placeholder.com/50'
 },
 {
   id: '4',
   name: 'Sarah Davis',
   status: 'offline',
   lastSeen: '1 day ago',
   avatar: 'https://via.placeholder.com/50'
 },
 {
   id: '5',
   name: 'James Miller',
   status: 'online',
   avatar: 'https://via.placeholder.com/50'
 }
];

type FriendsScreenProps = {
 navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

export default function FriendsScreen({ navigation }: FriendsScreenProps): JSX.Element {

    const navigateToMessage = (name : string) => {
        navigation.navigate('Conversation', { 
            id: 'someId',
            name: name
        });
    }

    const renderFriend = ({ item }: { item: Friend }) => (
    <TouchableOpacity onPress={() => navigateToMessage(item.name)} style={styles.friendContainer}>
        <View style={styles.avatarContainer}>
        <Image 
            source={{ uri: item.avatar }}
            style={styles.avatar}
        />
        </View>
        <View style={styles.friendInfo}>
        <Text style={styles.friendName}>{item.name}</Text>
        <Text style={styles.statusText}>
            {item.status === 'online' ? 'Online' : `Last seen ${item.lastSeen}`}
        </Text>
        </View>
        <TouchableOpacity onPress={() => navigateToMessage(item.name)} style={styles.messageButton}>
        <Text style={styles.messageButtonText}>Message</Text>
        </TouchableOpacity>
    </TouchableOpacity>
    );

    return (
    <SafeAreaView style={styles.container}>
        <FlatList
        data={mockFriends}
        renderItem={renderFriend}
        keyExtractor={item => item.id}
        style={styles.list}
        />
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#fff',
 },
 searchBarPlaceholder: {
   backgroundColor: '#f5f5f5',
   padding: 12,
   margin: 10,
   borderRadius: 8,
 },
 searchText: {
   color: '#666',
   fontSize: 16,
 },
 list: {
   flex: 1,
 },
 friendContainer: {
   flexDirection: 'row',
   padding: 15,
   alignItems: 'center',
   borderBottomWidth: 1,
   borderBottomColor: '#eee',
 },
 avatarContainer: {
   position: 'relative',
 },
 avatar: {
   width: 50,
   height: 50,
   borderRadius: 25,
   backgroundColor: '#eee',
 },
 statusDot: {
   width: 12,
   height: 12,
   borderRadius: 6,
   position: 'absolute',
   bottom: 0,
   right: 0,
   borderWidth: 2,
   borderColor: '#fff',
 },
 friendInfo: {
   flex: 1,
   marginLeft: 15,
 },
 friendName: {
   fontSize: 16,
   fontWeight: 'bold',
   marginBottom: 2,
 },
 statusText: {
   fontSize: 14,
   color: '#666',
 },
 messageButton: {
   backgroundColor: '#007AFF',
   paddingHorizontal: 15,
   paddingVertical: 8,
   borderRadius: 20,
 },
 messageButtonText: {
   color: '#fff',
   fontSize: 14,
   fontWeight: '500',
 }
});