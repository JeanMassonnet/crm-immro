import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import type { AuthUser } from './types';
import type { User } from "../../types";

export async function loginWithEmail(email: string, password: string): Promise<User> {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
  
  if (!userDoc.exists()) {
    throw new Error('User data not found');
  }

  return {
    ...userDoc.data(),
    id: userCredential.user.uid,
    createdAt: userDoc.data().createdAt.toDate(),
    updatedAt: userDoc.data().updatedAt.toDate()
  } as User;
}

export async function registerWithEmail(
  email: string, 
  password: string, 
  userData: Omit<AuthUser, 'password'>
): Promise<User> {
  let firebaseUser = null;
  
  try {
    // 1. Créer l'utilisateur dans Firebase Auth et attendre la confirmation
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    firebaseUser = userCredential.user;

    // 2. S'assurer que l'utilisateur est bien créé et authentifié
    if (!firebaseUser || !firebaseUser.uid) {
      throw new Error('Failed to create Firebase user');
    }

    // 3. Mettre à jour le profil avec le nom complet
    await updateProfile(firebaseUser, {
      displayName: `${userData.firstName} ${userData.lastName}`
    });

    // 4. Préparer les données utilisateur pour Firestore
    const userDocData = {
      id: firebaseUser.uid,
      email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
      companyName: userData.companyName,
      siret: userData.siret,
      address: {
        street: '',
        streetNumber: '',
        zipCode: '',
        city: '',
        country: 'France'
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // 5. Créer le document utilisateur dans Firestore
    // Utiliser le même ID que celui de Firebase Auth
    const userRef = doc(db, 'users', firebaseUser.uid);
    await setDoc(userRef, userDocData);

    // 6. Retourner les données utilisateur
    return userDocData as User;
  } catch (error) {
    // En cas d'erreur, nettoyer en supprimant l'utilisateur Firebase Auth
    if (firebaseUser) {
      try {
        await firebaseUser.delete();
      } catch (deleteError) {
        console.error('Error cleaning up Firebase user:', deleteError);
      }
    }
    throw error;
  }
}

export async function logout(): Promise<void> {
  await signOut(auth);
}

export function getCurrentUser() {
  return auth.currentUser;
}