// Displays either the followers or following list of a user with usernames
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getDocs, collection, doc } from 'firebase/firestore';
import db from '../../services/firestore';
import FollowButton from '../../components/FollowButton';
import { getUsernameById } from '../../services/profile'; // Import helper to fetch usernames

export default function FollowListScreen() {
  const route = useRoute();
  const { userId, type } = route.params; // 'type' is either 'followers' or 'following'
  const [users, setUsers] = useState([]); // List of users with { id, username }
  const [loading, setLoading] = useState(true);

  // Fetch user IDs and then their usernames
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const userRef = doc(db, 'users', userId);
        const subCol = collection(userRef, type); // either 'followers' or 'following'
        const snapshot = await getDocs(subCol);

        const userList = await Promise.all(
          snapshot.docs.map(async (docSnap) => {
            const id = docSnap.id;
            const username = await getUsernameById(id); // Fetch username for each ID
            return { id, username };
          })
        );

        setUsers(userList);
      } catch (err) {
        console.error('Error fetching user list:', err);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [userId, type]);

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 20 }} />;
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {/* Header label based on type */}
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 16 }}>
        {type === 'followers' ? 'Followers' : 'Following'}
      </Text>

      {/* List of usernames with follow/unfollow buttons */}
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingVertical: 12,
              borderBottomWidth: 0.5,
              borderColor: '#ccc',
            }}
          >
            {/* Display username or fallback to user ID */}
            <Text>{item.username || item.id}</Text>
            <FollowButton targetUserId={item.id} />
          </View>
        )}
      />
    </View>
  );
}
