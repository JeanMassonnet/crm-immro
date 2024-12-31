import { 
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  DocumentData,
  serverTimestamp,
  Timestamp
} from "firebase/firestore";
import { db } from "../config/firebase";

// Generic type for Firestore data
type WithTimestamps = {
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};

// Generic CRUD operations
export const createDocument = async <T extends DocumentData>(
  collectionName: string,
  data: T
) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error(`Error creating document in ${collectionName}:`, error);
    throw error;
  }
};

export const getDocument = async <T extends DocumentData>(
  collectionName: string,
  documentId: string
): Promise<T & WithTimestamps> => {
  try {
    const docRef = doc(db, collectionName, documentId);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      throw new Error('Document not found');
    }
    
    return docSnap.data() as T & WithTimestamps;
  } catch (error) {
    console.error(`Error getting document from ${collectionName}:`, error);
    throw error;
  }
};

export const updateDocument = async <T extends DocumentData>(
  collectionName: string,
  documentId: string,
  data: Partial<T>
) => {
  try {
    const docRef = doc(db, collectionName, documentId);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error(`Error updating document in ${collectionName}:`, error);
    throw error;
  }
};

export const deleteDocument = async (
  collectionName: string,
  documentId: string
) => {
  try {
    const docRef = doc(db, collectionName, documentId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(`Error deleting document from ${collectionName}:`, error);
    throw error;
  }
};

export const queryDocuments = async <T extends DocumentData>(
  collectionName: string,
  conditions: { field: string; operator: string; value: any }[]
): Promise<(T & WithTimestamps)[]> => {
  try {
    const q = query(
      collection(db, collectionName),
      ...conditions.map(({ field, operator, value }) => 
        where(field, operator as any, value)
      )
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as (T & WithTimestamps)[];
  } catch (error) {
    console.error(`Error querying documents in ${collectionName}:`, error);
    throw error;
  }
};

export const getAllDocuments = async <T extends DocumentData>(
  collectionName: string
): Promise<(T & WithTimestamps)[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as (T & WithTimestamps)[];
  } catch (error) {
    console.error(`Error getting all documents from ${collectionName}:`, error);
    throw error;
  }
};