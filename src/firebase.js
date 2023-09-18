import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBIFJxnjs5UShhFIKcRGdJDgtFBM6WikaY",
  authDomain: "test-2c168.firebaseapp.com",
  databaseURL:
    "https://test-2c168-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "test-2c168",
  storageBucket: "test-2c168.appspot.com",
  messagingSenderId: "137785448596",
  appId: "1:137785448596:web:e55eb05f95a1aa9afb7c81",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
export { database, auth };
