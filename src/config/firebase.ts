import { initializeApp } from "firebase/app";
import { getAuth, browserPopupRedirectResolver, initializeAuth, indexedDBLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDnB4z0f_7CAkJ44TJZb7ePwjY6Pz0iIbA",
  authDomain: "immro-166b5.firebaseapp.com",
  projectId: "immro-166b5",
  storageBucket: "immro-166b5.appspot.com",
  messagingSenderId: "758147970707",
  appId: "1:758147970707:web:68aef42502d2f35e1c3f66"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase services with modern configuration
export const auth = initializeAuth(app, {
  persistence: indexedDBLocalPersistence,
  popupRedirectResolver: browserPopupRedirectResolver,
});

export const db = getFirestore(app);
export const storage = getStorage(app);