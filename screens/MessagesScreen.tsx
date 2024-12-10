import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainTabParamList, RootStackParamList } from '../types';

type Message = {
  id: string;
  sender: string;
  message: string;
  time: string;
};

const mockMessages: Message[] = [
  {
    id: '1',
    sender: 'John Doe',
    message: 'Hey, how are you?',
    time: '10:30 AM',
  },
  {
    id: '2',
    sender: 'Jane Smith',
    message: 'Did you see the latest update?',
    time: '9:45 AM',
  },
  {
    id: '3',
    sender: 'Mike Johnson',
    message: 'Meeting at 3 PM today',
    time: 'Yesterday',
  },
  {
    id: '4',
    sender: 'Sarah Williams',
    message: 'Thanks for your help!',
    time: 'Yesterday',
  },
  {
    id: '5',
    sender: 'David Brown',
    message: 'Let\'s catch up soon',
    time: 'Yesterday',
  }
];

type MessagesScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

export default function MessagesScreen({ navigation }: MessagesScreenProps): JSX.Element {

  const navigateToMessage = (name : string) => {
    navigation.navigate('Conversation', { 
        id: 'someId',
        name: name
    });
  }

  const renderMessage = ({ item }: { item: Message }) => (
    <TouchableOpacity onPress={() => navigateToMessage(item.sender)} style={styles.messageContainer}>
      <View style={styles.messageContent}>
        <View style={styles.messageHeader}>
          <Text style={styles.senderName}>{item.sender}</Text>
          <Text style={styles.messageTime}>{item.time}</Text>
        </View>
        <View style={styles.messageBody}>
          <Text style={styles.messageText} numberOfLines={1}>
            {item.message}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={mockMessages}
        renderItem={renderMessage}
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