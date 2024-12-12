import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, FlatList, Image, Alert, RefreshControl, RootTagContext } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainTabParamList, RootStackParamList } from '../types';
import { UserDetails } from '../context/ContextTypes';
import { friendsService } from '../services/FriendsService';
import { gruopsService } from '../services/GroupsService';
import { RouteProp } from '@react-navigation/native';


export default function MembersScreen({ navigation , route}: any): JSX.Element {
  const [members, setMembers] = useState<UserDetails[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchGroupMembers = async (): Promise<void> => {
    try {
      const membersData:UserDetails[]|null = await gruopsService.fetchGroupMembers(route.params.id);
      if(membersData){
        setMembers(membersData);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchGroupMembers();
  }, []);

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        await fetchGroupMembers();
        setRefreshing(false);
    }, []);

    const renderMembers = ({ item }: { item: UserDetails }) => (
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
    </TouchableOpacity>
    );

    return (
    <SafeAreaView style={styles.container}>
        <FlatList
        data={members}
        renderItem={renderMembers}
        keyExtractor={item => item.uid}
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