// Login screen that allows users to sign in with email and password

import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import { signIn } from '../../services/Auth'; // Firebase email/password sign-in
import { useNavigation } from '@react-navigation/native'; // For navigation

export default function LoginScreen() {
  const navigation = useNavigation(); // Hook for navigating between screens

  // State to store email and password inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handles user login
  const handleLogin = async () => {
    try {
      // Try signing in the user with Firebase Auth
      await signIn(email, password);

      // Navigate to the main app screen (e.g. Feed) after successful login
      navigation.reset({
        index: 0,
        routes: [{ name: 'Feed' }], // Replace 'Feed' with your main screen name
      });

    } catch (error) {
      // Show an alert with any login error messages
      Alert.alert('Login Error', error.message);
    }
  };

  return (
    <View style={{ padding: 16 }}>
      {/* Login form heading */}
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Login</Text>

      {/* Input for email */}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{ marginBottom: 12, borderBottomWidth: 1, padding: 8 }}
      />

      {/* Input for password */}
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ marginBottom: 12, borderBottomWidth: 1, padding: 8 }}
      />

      {/* Button to trigger login */}
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
