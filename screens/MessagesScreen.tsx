import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, FlatList, Alert, RefreshControl } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainTabParamList, RootStackParamList } from '../types';
import { friendsService } from '../services/FriendsService';
import { useUser } from '../context/UserContext';
import { Chat } from '../context/ContextTypes';
import { getRelativeTime } from '../utils/RelativeTime';
import { userService } from '../services/UserService';

type MessagesScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

export default function MessagesScreen({ navigation }: MessagesScreenProps): JSX.Element {

  const [chats, setChats] = useState<Chat[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchUserChats = async (): Promise<void> => {
    try {
      const chatData:Chat[]|null = await userService.fetchUserChats();
      if(chatData){
        setChats(chatData);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUserChats();
  }, []);

  const onRefresh = React.useCallback(async () => {
      setRefreshing(true);
      await fetchUserChats();
      setRefreshing(false);
  }, []);

  const navigateToMessage = (name : string) => {
    navigation.navigate('Conversation', { 
        id: 'someId',
        name: name,
        isGroup: false
    });
  }

  const renderMessage = ({ item }: { item: Chat }) => (
    <TouchableOpacity onPress={()=> navigateToMessage(item.participant.name + " " + item.participant.lastname)} style={styles.messageContainer}>
      <View style={styles.messageContent}>
        <View style={styles.messageHeader}>
          <Text style={styles.senderName}>{item.participant.name+ " " + item.participant.lastname}</Text>
          <Text style={styles.messageTime}>{getRelativeTime(item.lastMessage.timestamp)}</Text>
        </View>
        <View style={styles.messageBody}>
          <Text style={styles.messageText} numberOfLines={1}>
            {item.lastMessage.content}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={chats}
        renderItem={renderMessage}
        keyExtractor={item => item.participant.uid}
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
  messageContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  senderName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  messageTime: {
    fontSize: 14,
    color: '#666',
  },
  messageBody: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  messageText: {
    fontSize: 15,
    color: '#333',
    flex: 1,
    marginRight: 10,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#007AFF',
  },
});