export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  AddFriend: undefined;
  CreateGroup: undefined;
  About: undefined;
  Profile: undefined;
  FriendRequests: undefined;
  Members: undefined;
  Conversation: ConversationParams
};

export type MainTabParamList = {
  Groups: undefined;
  Messages: undefined;
  Friends: undefined;
  Settings: undefined;
};

type ConversationParams = {
  name: string;
  id: string;
  isGroup: boolean;
};
