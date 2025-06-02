// This screen displays a user's profile info and their posts
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { getUserPosts, getUsernameById } from '../../services/profile';
import PostCard from '../../components/PostCard';

export default function ProfileScreen() {
  const { user } = useAuth(); // Get current Firebase user
  const [posts, setPosts] = useState([]); // User's posts
  const [username, setUsername] = useState(''); // Fetched username

  // Load user's posts and username on mount
  useEffect(() => {
    const loadData = async () => {
      if (!user?.uid) return;

      // Fetch posts by the current user
      const fetchedPosts = await getUserPosts(user.uid);
      setPosts(fetchedPosts);

      // Fetch username from Firestore
      const name = await getUsernameById(user.uid);
      setUsername(name);
    };

    loadData();
  }, [user]);

  return (
    <View style={{ padding: 16 }}>
      {/* Display username as profile name */}
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
        {username || 'User'}
      </Text>

      {/* List of posts by the user */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostCard post={item} />}
      />
    </View>
  );
}
