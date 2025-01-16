import { initializeApp } from "firebase/app";
import { getAuth, browserLocalPersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Vérifier que toutes les clés sont correctes et présentes
const firebaseConfig = {
  apiKey: "AIzaSyDnB4z0f_7CAkJ44TJZb7ePwjY6Pz0iIbA",
  authDomain: "immro-166b5.firebaseapp.com",
  projectId: "immro-166b5",
  storageBucket: "immro-166b5.appspot.com",
  messagingSenderId: "758147970707",
  appId: "1:758147970707:web:68aef42502d2f35e1c3f66",
  // Ajouter CORS settings
  authDomain: "immro-166b5.firebaseapp.com"
};

// Initialiser Firebase avant tout
const app = initializeApp(firebaseConfig);

// Initialiser Auth avec persistence
const auth = initializeAuth(app, {
  persistence: browserLocalPersistence,
  // Ajouter les domaines autorisés
  authDomain: firebaseConfig.authDomain
});

// Initialiser Firestore
const db = getFirestore(app);

// Initialiser Storage avec CORS
const storage = getStorage(app);

export { app, auth, db, storage };