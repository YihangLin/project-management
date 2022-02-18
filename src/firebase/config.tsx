import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAxVEg_DOcDablRKcSEz3L3cGPZPEDRWss",
  authDomain: "project-management-f77be.firebaseapp.com",
  projectId: "project-management-f77be",
  storageBucket: "project-management-f77be.appspot.com",
  messagingSenderId: "523598370106",
  appId: "1:523598370106:web:c7c01190fafb0b25fd6c03"
};

// init firebase
initializeApp(firebaseConfig);

// init firestore
const db = getFirestore();

// init firebase auth
const auth = getAuth();

const storage = getStorage();

export { db, auth, storage }