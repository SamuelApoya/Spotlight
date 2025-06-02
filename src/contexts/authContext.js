// Provides a global auth context to track the currently logged-in user
import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/Auth';
import auth from '../services/Auth';

// Create the context
const AuthContext = createContext();

// Provider component wraps the app and provides the user state
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);       // Authenticated user
  const [loading, setLoading] = useState(true); // Tracks loading state

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for accessing auth context
export const useAuth = () => useContext(AuthContext);
