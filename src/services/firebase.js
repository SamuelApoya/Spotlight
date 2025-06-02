// Initializes the Firebase app with your project's configuration

import { initializeApp } from 'firebase/app';

// Replace with your actual Firebase config values
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

// Initialize the Firebase app
const app = initializeApp(firebaseConfig);

export default app;
