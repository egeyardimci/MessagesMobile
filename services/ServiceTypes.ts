type FriendRequestData = {
    email: string;
  };
  
type GenericResponse = {
    message: string;
}; 

type MessageData = {
messageList: [
    {
        id: string,
        timestamp: string,
        content: string,
        sender: string,
        receiver: string,
        groupMessage: boolean
        senderName: string
    }
    ]
};

type LoginData = {
    email: string;
    password: string;
  };
  
type RegisterData = {
    name: string;
    lastname:string
    email: string;
    password: string;
};

type LoginResponse = {
    token: string;
};

type RegisterResponse = {
    message: string;
};



