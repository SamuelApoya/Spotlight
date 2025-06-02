// Service to fetch posts for the global feed.

import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import db from './firestore';

// Fetches all posts ordered by most recent
export const getGlobalFeed = async () => {
  // Create a query to fetch posts ordered by 'createdAt' in descending order
  const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
  // Execute the query
  const snapshot = await getDocs(q);
  // Map the documents to an array of post objects
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
