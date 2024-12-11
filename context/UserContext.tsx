// context/UserContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { UserDetails } from './ContextTypes';


interface UserContextType {
  userDetails: UserDetails | null;
  setUserDetails: (data: UserDetails | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  return (
    <UserContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}