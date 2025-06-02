// Handles fetching profile-related data such as posts and usernames

import { collection, getDocs, query, where, getDoc, doc } from 'firebase/firestore';
import db from './firestore';

/**
 * Fetch all posts created by a specific user.
 * @param {string} userId - UID of the user
 * @returns {Promise<Array>} - List of posts
 */
export const getUserPosts = async (userId) => {
  const postsRef = collection(db, 'posts');
  const q = query(postsRef, where('userId', '==', userId));
  const snapshot = await getDocs(q);

  // Return an array of posts with their IDs
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

/**
 * Get a user's username by their UID.
 * @param {string} userId - UID of the user
 * @returns {Promise<string>} - Username or empty string if not found
 */
export const getUsernameById = async (userId) => {
  const userDoc = await getDoc(doc(db, 'users', userId));
  return userDoc.exists() ? userDoc.data().username : '';
};
