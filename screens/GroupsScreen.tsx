import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
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

  useEffect(() => {
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

    fetchUserGroups();
  }, []);

  const navigateToMessage = (name : string) => {
    navigation.navigate('Conversation', { 
        id: 'someId',
        name: name
    });
  }

 const renderGroup = ({ item }: { item: Group }) => (
   <TouchableOpacity onPress={() => navigateToMessage(item.name)} style={styles.groupContainer}>
     <View style={styles.groupContent}>
       <View style={styles.groupHeader}>
         <Text style={styles.groupName}>{item.name}</Text>
         <Text style={styles.groupTime}>{getRelativeTime(item.lastMessage.timestamp)}</Text>
       </View>
       <View style={styles.groupBody}>
         <Text style={styles.lastMessage} numberOfLines={1}>
           {item.lastMessage.content}
         </Text>
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