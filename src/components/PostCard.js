// Component to render individual post details.

import React from 'react';
import { View, Text, Image } from 'react-native';

export default function PostCard({ post }) {
  return (
    <View style={{ marginBottom: 16 }}>
      {/* Display the username of the post's author */}
      <Text style={{ fontWeight: 'bold' }}>{post.username}</Text>
      {/* Display the caption of the post */}
      <Text>{post.caption}</Text>
      {/* If the post has an image, display it */}
      {post.mediaUrl && (
        <Image source={{ uri: post.mediaUrl }} style={{ width: '100%', height: 200 }} />
      )}
    </View>
  );
}
