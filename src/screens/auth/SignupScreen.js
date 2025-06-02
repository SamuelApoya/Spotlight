// Signup screen to register new users using email/password
import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import { signUp } from '../../services/auth';
import { useNavigation } from '@react-navigation/native';

export default function SignupScreen() {
  const navigation = useNavigation(); // Hook for navigation

  // State to track email and password inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handles new user registration
  const handleSignup = async () => {
    try {
      await signUp(email, password); // Call Firebase signup method

      // Navigate to main app screen after signup
      navigation.reset({
        index: 0,
        routes: [{ name: 'Feed' }],
      });
    } catch (error) {
      Alert.alert('Signup Error', error.message); // Show error message in alert
    }
  };

  return (
    <View style={{ padding: 16 }}>
      {/* Signup screen heading */}
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Sign Up</Text>

      {/* Input field for email */}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{ marginBottom: 12, borderBottomWidth: 1, padding: 8 }}
      />

      {/* Input field for password */}
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ marginBottom: 12, borderBottomWidth: 1, padding: 8 }}
      />

      {/* Button to create a new account */}
      <Button title="Create Account" onPress={handleSignup} />
    </View>
  );
}
