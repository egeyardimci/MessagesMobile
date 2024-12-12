import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, FlatList, RefreshControl } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainTabParamList, RootStackParamList } from '../types';
import { Group } from '../context/ContextTypes';
import { userService } from '../services/UserService';
import { getRelativeTime } from '../utils/RelativeTime';

type GroupsScreenProps = {
 navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

export default function GroupsScreen({ navigation }: GroupsScreenProps): JSX.Element {

  const [groups, setGroups] = useState<Group[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    const fetchUserGroups = async (): Promise<void> => {
      try {
        const groupsData:Group[]|null = await userService.fetchUserGroups();
        if(groupsData){
          setGroups(groupsData);
        }
      } catch (error) {
        console.log(error);
      }
    }
  useEffect(() => {
    fetchUserGroups();
  }, []);

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        await fetchUserGroups();
        setRefreshing(false);
    }, []);

  const navigateToMessage = (name : string,id:string) => {
    navigation.navigate('Conversation', { 
        id: id,
        name: name,
        email:"null",
        isGroup:true
    });
  }

 const renderGroup = ({ item }: { item: Group }) => (
   <TouchableOpacity onPress={() => navigateToMessage(item.name,item.id)} style={styles.groupContainer}>
     <View style={styles.groupContent}>
       <View style={styles.groupHeader}>
         <Text style={styles.groupName}>{item.name}</Text>
         {item.lastMessage ? (<Text style={styles.groupTime}>{getRelativeTime(item.lastMessage.timestamp)}</Text>) : null}       
       </View>
       <View style={styles.groupBody}>
        {item.lastMessage ? (<Text style={styles.lastMessage} numberOfLines={1}>{item.lastMessage.content}</Text>) : null}         
         <View style={styles.groupInfo}>
           <Text style={styles.memberCount}>{item.members.length} members</Text>
         </View>
       </View>
     </View>
   </TouchableOpacity>
 );

 return (
   <SafeAreaView style={styles.container}>
     <FlatList
       data={groups}
       renderItem={renderGroup}
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
 list: {
   flex: 1,
 },
 groupContainer: {
   padding: 15,
   borderBottomWidth: 1,
   borderBottomColor: '#eee',
 },
 groupContent: {
   flex: 1,
 },
 groupHeader: {
   flexDirection: 'row',
   justifyContent: 'space-between',
   marginBottom: 5,
 },
 groupName: {
   fontSize: 17,
   fontWeight: 'bold',
 },
 groupTime: {
   fontSize: 14,
   color: '#666',
 },
 groupBody: {
   gap: 5,
 },
 lastMessage: {
   fontSize: 15,
   color: '#666',
 },
 groupInfo: {
   flexDirection: 'row',
   justifyContent: 'space-between',
   alignItems: 'center',
 },
 memberCount: {
   fontSize: 13,
   color: '#888',
 },
 unreadBadge: {
   backgroundColor: '#007AFF',
   borderRadius: 10,
   paddingHorizontal: 8,
   paddingVertical: 2,
 },
 unreadCount: {
   color: '#fff',
   fontSize: 12,
   fontWeight: 'bold',
 }
});