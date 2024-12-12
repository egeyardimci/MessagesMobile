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
    }
    ]
};

type LoginData = {
    email: string;
    password: string;
  };
  
type RegisterData = {
    name: string;
    email: string;
    password: string;
};

type LoginResponse = {
    token: string;
};

type RegisterResponse = {
    message: string;
};

type AddGroupMemberRequest = {
    email: string;
};

