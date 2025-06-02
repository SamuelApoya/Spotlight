// This screen displays a list of all posts in the global feed.

import React, { useEffect, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import { getGlobalFeed } from '../../services/feed';
import PostCard from '../../components/PostCard';

export default function FeedScreen() {
  // State to hold the list of posts
  const [posts, setPosts] = useState([]);

  // Fetch posts when the component mounts
  useEffect(() => {
    const fetchFeed = async () => {
      const data = await getGlobalFeed();
      setPosts(data);
    };
    fetchFeed();
  }, []);

  return (
    <View style={{ padding: 16 }}>
      {/* FlatList efficiently renders the list of posts */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostCard post={item} />}
        ListEmptyComponent={<Text>No posts yet</Text>}
      />
    </View>
  );
}
