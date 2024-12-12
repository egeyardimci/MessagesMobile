import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, FlatList, Image, RefreshControl } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainTabParamList, RootStackParamList } from '../types';
import { UserDetails } from '../context/ContextTypes';
import { friendsService } from '../services/FriendsService';


type FriendsScreenProps = {
 navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

export default function FriendsScreen({ navigation }: FriendsScreenProps): JSX.Element {
  const [friends, setFriends] = useState<UserDetails[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchUserFriends = async (): Promise<void> => {
    try {
      const friendsData:UserDetails[]|null = await friendsService.getUserFriends();
      if(friendsData){
        setFriends(friendsData);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUserFriends();
  }, []);

  const onRefresh = React.useCallback(async () => {
      setRefreshing(true);
      await fetchUserFriends();
      setRefreshing(false);
  }, []);

  const navigateToMessage = (name : string,id:string,email:string) => {
    navigation.navigate('Conversation', { 
        id: id,
        name: name,
        email: email,
        isGroup: false
    });
  }

    const renderFriend = ({ item }: { item: UserDetails }) => (
    <TouchableOpacity onPress={() => navigateToMessage(item.name,item.id,item.email)} style={styles.friendContainer}>
        <View style={styles.avatarContainer}>
        <Image 
            source={{ uri: 'https://via.placeholder.com/50' }}
            style={styles.avatar}
        />
        </View>
        <View style={styles.friendInfo}>
        <Text style={styles.friendName}>{item.name + " " + item.lastname || " null"}</Text>
        </View>
        <TouchableOpacity onPress={() => navigateToMessage(item.name,item.id,item.email)} style={styles.messageButton}>
        <Text style={styles.messageButtonText}>Message</Text>
        </TouchableOpacity>
    </TouchableOpacity>
    );

    return (
    <SafeAreaView style={styles.container}>
        <FlatList
        data={friends}
        renderItem={renderFriend}
        keyExtractor={item => item.id}
        style={styles.list}
        refreshControl={
        <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#007AFF"]} // Android
            tintColor="#007AFF" // iOS
          />
        }
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