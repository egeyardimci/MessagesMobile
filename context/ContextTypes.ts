export interface Message {
    id:string;
    timestamp:string;
    content:string;
    sender:string;
    receiver:string;
    groupMessage:string;
}

export interface UserDetails {
    name: string;
    lastname: string;
    email: string;
    uid: string;
  }

  export interface Group {
    id: string;
    name: string;
    members: string[];
    lastMessage: Message;
  }

  export interface Chat {
    participant:UserDetails;
    lastMessage:Message;
  }