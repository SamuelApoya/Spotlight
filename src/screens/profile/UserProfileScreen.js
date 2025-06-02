// Displays another user's profile and their posts, with a follow/unfollow button
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getUserPosts, getUsernameById } from '../../services/profile';
import FollowButton from '../../components/FollowButton';
import PostCard from '../../components/PostCard';

export default function UserProfileScreen() {
  const route = useRoute();
  const { userId } = route.params;

  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const name = await getUsernameById(userId);
        const userPosts = await getUserPosts(userId);
        setUsername(name);
        setPosts(userPosts);
      } catch (err) {
        console.error('Error loading user profile:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [userId]);

  if (loading) return <ActivityIndicator style={{ marginTop: 20 }} />;

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {/* Display username and follow button */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{username || 'User'}</Text>
        <FollowButton targetUserId={userId} />
      </View>

      {/* List of posts */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostCard post={item} />}
        contentContainerStyle={{ paddingTop: 16 }}
      />
    </View>
  );
}
