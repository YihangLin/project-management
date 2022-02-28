import { db } from "../firebase/config";
import { collection, addDoc, setDoc, doc, updateDoc } from "firebase/firestore";
import { useState, useEffect } from 'react';
import { Project } from "../Interfaces/Interfaces";
// import { Project } from '';

export const useFirestore = (collectionToAdd: string) => {
  const [firestoreError, setFirestoreError] = useState<string | null>(null);
  const [firestorePending, setFirestorePending] = useState<boolean>(false);
  const [isCancelled, setIsCancelled] = useState<boolean>(false);

  const ref = collection(db, collectionToAdd);

  const addDocument = async (docToAdd: Project) => {
    setFirestorePending(true);
    setFirestoreError(null);

    try {
      const addedDocument = await addDoc(ref, docToAdd);
      await setDoc(doc(db, 'comments', addedDocument.id), {
        comments: []
      });
      // console.log(addedDocument);
      if (!isCancelled) {
        setFirestorePending(false);
        // setFirestoreError('Test Error');
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

  const updateDocument = async (id: string, docToUpdate: any) => {
    setFirestorePending(true);
    setFirestoreError(null);

    try {
      await updateDoc(doc(ref, id), docToUpdate);

      if (!isCancelled) {
        // console.log('setting');
        setFirestorePending(false);
      }
      // console.log(updatedDoc);

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

  return { firestoreError, firestorePending, addDocument, updateDocument };

}