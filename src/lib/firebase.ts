import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDT85GldYoqR6XbIc-4koo58DW042bxQkw",
  authDomain: "clonetrello-9b66d.firebaseapp.com",
  projectId: "clonetrello-9b66d",
  storageBucket: "clonetrello-9b66d.firebasestorage.app",
  messagingSenderId: "826683383832",
  appId: "1:826683383832:web:ec516cbf4ae0348886236d",
  measurementId: "G-7C6QGY27D9",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth(app);
