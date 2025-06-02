// Entry point of the app — wraps everything in auth provider and navigation container
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AuthStack from './navigation/AuthStack';
import MainStack from './navigation/MainStack';

// Decides whether to show the auth flow or the main app
function RootNavigation() {
  const { user, loading } = useAuth();
  if (loading) return null; // Show splash/loading

  return user ? <MainStack /> : <AuthStack />;
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </AuthProvider>
  );
}
