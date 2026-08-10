import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

// Centralized Firebase Configuration initialized once
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyBx37DAaCnao3IdggiM-WJ0KTGX2rh5X48',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'beacon-9e66f.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'beacon-9e66f',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'beacon-9e66f.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '895628214372',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:895628214372:web:41cf77f510749f7e929f71',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-0N3JV5HG1D',
}

// Singleton Firebase App initialization
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)

// Centralized Firebase Authentication instance exported
export const auth = getAuth(app)

// Use browser locale setting for device language support
auth.useDeviceLanguage()

export default app
