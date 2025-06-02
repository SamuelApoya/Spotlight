import React from 'react';
import { View, Text, Button } from 'react-native';
import { logout } from '../../services/Auth';

export default function HomeScreen() {
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Welcome to Spotlight!</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}
