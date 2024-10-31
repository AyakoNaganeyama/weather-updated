// Import the functions you need from the SDKs you need
import { initializeApp, getApp } from 'firebase/app'

import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: process.env.EXPO_PUBLIC_API_KEY,
	authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
	projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
	storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
	messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
	appId: process.env.EXPO_PUBLIC_APP_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const firestore = getFirestore(app)
const storage = getStorage(app)

export { app, firestore, storage }
