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
  // Create auth user first
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const { user } = userCredential;

  // Update display name
  await updateProfile(user, {
    displayName: `${userData.firstName} ${userData.lastName}`
  });

  // Prepare user document data
  const userDocData = {
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

  // Create user document in Firestore
  const userRef = doc(db, 'users', user.uid);
  await setDoc(userRef, userDocData);

  return {
    ...userDocData,
    id: user.uid
  } as User;
}

export async function logout(): Promise<void> {
  await signOut(auth);
}

export function getCurrentUser() {
  return auth.currentUser;
}