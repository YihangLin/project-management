import { db } from "../firebase/config";
import { collection, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { useState, useEffect } from 'react';
import { Project } from "../Interfaces/Interfaces";

export const useFirestore = (collectionToAdd: string) => {
  const [firestoreError, setFirestoreError] = useState<string | null>(null);
  const [firestorePending, setFirestorePending] = useState<boolean>(false);
  const [isCancelled, setIsCancelled] = useState<boolean>(false);

  const ref = collection(db, collectionToAdd);

  // add a document to the collection
  const addDocument = async (docToAdd: Project) => {
    setFirestorePending(true);
    setFirestoreError(null);

    try {
      const addedDocument = await addDoc(ref, docToAdd);
      if (!isCancelled) {
        setFirestorePending(false);
      }

      return addedDocument.id;
    } catch (err) {
      if (!isCancelled) {
        if (err instanceof Error) {
          setFirestoreError(err.message);
          setFirestorePending(false);
        }
      }
    }
  }

  // update a document
  const updateDocument = async (id: string, docToUpdate: any) => {
    setFirestorePending(true);
    setFirestoreError(null);

    try {
      await updateDoc(doc(ref, id), docToUpdate);

      if (!isCancelled) {
        setFirestorePending(false);
      }
    } catch (err) {
      if (!isCancelled) {
        if (err instanceof Error) {
          setFirestoreError(err.message);
          setFirestorePending(false);
        }
      }
    }
  }

  // delete a document
  const deleteDocument = async (id: string) => {
    setFirestorePending(true);
    setFirestoreError(null);

    try {
      await deleteDoc(doc(ref, id));

      if (!isCancelled) {
        setFirestorePending(false);
      }

    } catch (err) {
      if (!isCancelled) {
        if (err instanceof Error) {
          setFirestoreError(err.message);
          setFirestorePending(false);
        }
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true);
  }, [])

  return { firestoreError, firestorePending, addDocument, updateDocument, deleteDocument };

}