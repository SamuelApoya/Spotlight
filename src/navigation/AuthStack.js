// Handles navigation for authentication screens (login & signup)

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login" // Set initial screen
      screenOptions={{
        headerShown: false, // Hide headers for a cleaner UI
      }}
    >
      {/* Login screen */}
      <Stack.Screen name="Login" component={LoginScreen} />

      {/* Signup screen */}
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}
