// This screen allows users to create and upload a new post.
import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { createPost } from '../../services/post';

export default function CreatePostScreen() {
  // Get the current authenticated user
  const { user } = useAuth();
  // State to hold the caption and media URL input by the user
  const [caption, setCaption] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');

  // Function to handle post creation
  const handlePost = async () => {
    // Validate that the caption is not empty
    if (!caption) {
      alert('Please enter a caption.');
      return;
    }
    // Create the post
    await createPost({
      userId: user.uid,
      username: user.email,
      caption,
      mediaUrl,
    });
    // Reset the input fields
    setCaption('');
    setMediaUrl('');
    alert('Post created!');
  };

  return (
    <View style={{ padding: 16 }}>
      {/* Input for the caption */}
      <TextInput
        placeholder="Caption"
        value={caption}
        onChangeText={setCaption}
        style={{ marginBottom: 8, borderBottomWidth: 1 }}
      />
      {/* Input for the media URL */}
      <TextInput
        placeholder="Media URL"
        value={mediaUrl}
        onChangeText={setMediaUrl}
        style={{ marginBottom: 8, borderBottomWidth: 1 }}
      />
      {/* Button to submit the post */}
      <Button title="Post" onPress={handlePost} />
    </View>
  );
}
