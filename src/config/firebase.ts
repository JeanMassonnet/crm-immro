import { initializeApp } from "firebase/app";
import { getAuth, browserLocalPersistence, setPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDnB4z0f_7CAkJ44TJZb7ePwjY6Pz0iIbA",
  authDomain: "crm-immro.com",
  projectId: "crm-immro",
  storageBucket: "crm-immro.firebasestorage.app",
  messagingSenderId: "758147970707",
  appId: "1:758147970707:web:68aef42502d2f35e1c3f66"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Set authentication persistence to local
setPersistence(auth, browserLocalPersistence)
  .catch((error) => {
    console.error("Auth persistence error:", error);
  });