// App.js
import React from 'react';
import { UserProvider } from './context/UserContext';
import { AppNavigation } from './navigation/AppNavigation';


export default function App() {
  return (
    <UserProvider>
      <AppNavigation></AppNavigation>
    </UserProvider>
  );
}
