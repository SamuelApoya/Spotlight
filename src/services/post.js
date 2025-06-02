// Service to create a new post in Firestore.

import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import db from './firestore';

// Adds a post to the 'posts' collection
export const createPost = async ({ userId, username, caption, mediaUrl }) => {
  // Add a new document to the 'posts' collection with the provided data
  await addDoc(collection(db, 'posts'), {
    userId,
    username,
    caption,
    mediaUrl,
    createdAt: serverTimestamp(),
  });
};
