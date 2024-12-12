import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Message } from '../context/ContextTypes';
import { useUser } from '../context/UserContext';
import { messagesService } from '../services/MessagesService';
import { getRelativeTime } from '../utils/RelativeTime';
import { gruopsService } from '../services/GroupsService';

export default function ConversationScreen({ navigation, route }: any): JSX.Element {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const {userDetails} = useUser();

  const getUserMessages = async () => {
    try {
      const messagesData:MessageData|null = await messagesService.getUserChat(route.params.id);
      if(messagesData){
        setMessages(messagesData.messageList);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getGroupMessages = async () => {
    try {
      const messagesData:MessageData|null = await gruopsService.getGroupChat(route.params.id);
      if(messagesData){
        setMessages(messagesData.messageList);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if(!route.params.isGroup){
      getUserMessages();
    }
    else{
      getGroupMessages();
    }
    //TODO
    //open socket connection
  }, []);

  const sendMessage = () => {
    if(!route.params.isGroup){
      //TODO
      //send message to user
    }
    else{
      //TODO
      //send message to group
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[
      styles.messageContainer,
      item.sender === userDetails?.id ? styles.myMessage : styles.otherMessage
    ]}>
      <Text style={[
        styles.messageText,
        item.sender === userDetails?.id ? styles.myMessageText : styles.otherMessageText
      ]}>
        {item.content}
      </Text>
      <Text style={[
      styles.timestamp,
      item.sender === userDetails?.id ? styles.myTimestamp : styles.timestamp
    ]}>{item.timestamp && getRelativeTime(item.timestamp)}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.messagesList}
          inverted={false}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message..."
            multiline
          />
          <TouchableOpacity 
            style={styles.sendButton} 
            onPress={sendMessage}
            disabled={!message.trim()}
          >
            <Icon 
              name="send" 
              size={24} 
              color={message.trim() ? '#007AFF' : '#999'} 
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  messagesList: {
    padding: 15,
  },
  messageContainer: {
    maxWidth: '80%',
    marginVertical: 5,
    padding: 12,
    borderRadius: 20,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
    borderBottomRightRadius: 4,
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8E8E8',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
  },
  myMessageText: {
    color: '#fff',
  },
  otherMessageText: {
    color: '#000',
  },
  timestamp: {
    fontSize: 12,
    color: 'black',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  myTimestamp: {
    fontSize: 12,
    color: 'white',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    backgroundColor: '#f1f1f1',
    fontSize: 16,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});