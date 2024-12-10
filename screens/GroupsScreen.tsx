import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainTabParamList, RootStackParamList } from '../types';

type Group = {
 id: string;
 name: string;
 lastMessage: string;
 time: string;
 memberCount: number;
 unreadCount: number;
};

const mockGroups: Group[] = [
 {
   id: '1',
   name: 'Project Team Alpha',
   lastMessage: 'Let\'s meet tomorrow at 10',
   time: '10:30 AM',
   memberCount: 8,
   unreadCount: 3
 },
 {
   id: '2', 
   name: 'Family Group',
   lastMessage: 'Who\'s coming to dinner?',
   time: '9:45 AM',
   memberCount: 5,
   unreadCount: 0
 },
 {
   id: '3',
   name: 'Gaming Squad',
   lastMessage: 'Anyone up for a game?',
   time: 'Yesterday',
   memberCount: 12,
   unreadCount: 5
 },
 {
   id: '4',
   name: 'Tech Discussion',
   lastMessage: 'Check out this new feature!',
   time: 'Yesterday',
   memberCount: 25,
   unreadCount: 1
 },
 {
   id: '5',
   name: 'Book Club',
   lastMessage: 'Next book: The Great Gatsby',
   time: 'Yesterday',
   memberCount: 15,
   unreadCount: 0
 }
];

type GroupsScreenProps = {
 navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

export default function GroupsScreen({ navigation }: GroupsScreenProps): JSX.Element {

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
         <Text style={styles.groupTime}>{item.time}</Text>
       </View>
       <View style={styles.groupBody}>
         <Text style={styles.lastMessage} numberOfLines={1}>
           {item.lastMessage}
         </Text>
         <View style={styles.groupInfo}>
           <Text style={styles.memberCount}>{item.memberCount} members</Text>
         </View>
       </View>
     </View>
   </TouchableOpacity>
 );

 return (
   <SafeAreaView style={styles.container}>
     <FlatList
       data={mockGroups}
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