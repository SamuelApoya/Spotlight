// Service to handle following and unfollowing users.

import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import db from './firestore';

// Follows a user
export const followUser = async (currentUserId, targetUserId) => {
  // Create a document in the 'follows' collection representing the follow relationship
  await setDoc(doc(db, 'follows', `${currentUserId}_${targetUserId}`), {
    follower: currentUserId,
    following: targetUserId,
    createdAt: new Date(),
  });
};

// Unfollows a user
export const unfollowUser = async (currentUserId, targetUserId) => {
  // Delete the document representing the follow relationship
  await deleteDoc(doc(db, 'follows', `${currentUserId}_${targetUserId}`));
};
