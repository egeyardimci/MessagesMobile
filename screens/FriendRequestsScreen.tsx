import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, FlatList, Image, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainTabParamList, RootStackParamList } from '../types';
import { UserDetails } from '../context/ContextTypes';
import { friendsService } from '../services/FriendsService';


type FriendRequestsScreenProps = {
 navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

export default function FriendRequestsScreen({ navigation }: FriendRequestsScreenProps): JSX.Element {
  const [friendRequests, setFriendRequests] = useState<UserDetails[]>([]);

  useEffect(() => {
    const fetchFriendRequests = async (): Promise<void> => {
      try {
        const friendsData:UserDetails[]|null = await friendsService.getFriendRequests();
        if(friendsData){
            setFriendRequests(friendsData);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchFriendRequests();
  }, []);

  const addFriend = async (mail: string) => {
    try {
      const acceptFriendRequestData:FriendRequestData = {email : mail}; 
      await friendsService.acceptFriendRequest(acceptFriendRequestData);
      Alert.alert(
        'Success',
        'Friend request accepted!'
      );
      setFriendRequests(friendRequests.filter((friend) => friend.email !== mail));
    } catch (error:any) {
      console.log(error);
      Alert.alert(
        'Error',
        error.response?.data?.message || 'An error occurred during accepting friend request'
      )
    }
  }
    const renderFriend = ({ item }: { item: UserDetails }) => (
    <TouchableOpacity  style={styles.friendContainer}>
        <View style={styles.avatarContainer}>
        <Image 
            source={{ uri: 'https://via.placeholder.com/50' }}
            style={styles.avatar}
        />
        </View>
        <View style={styles.friendInfo}>
        <Text style={styles.friendName}>{item.name + " " + item.lastname || " null"}</Text>
        </View>
        <TouchableOpacity onPress={() => addFriend(item.email)} style={styles.messageButton}>
        <Text style={styles.messageButtonText}>+</Text>
        </TouchableOpacity>
    </TouchableOpacity>
    );

    return (
    <SafeAreaView style={styles.container}>
        <FlatList
        data={friendRequests}
        renderItem={renderFriend}
        keyExtractor={item => item.uid}
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