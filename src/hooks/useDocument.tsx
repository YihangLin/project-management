import { useState, useEffect } from "react";
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from "../firebase/config";


export const useDocument = (collection: string, id: string | undefined) => {
  const [document, setDocument] = useState<any | null>(null);
  const [documentError, setDocumentError] = useState<string | null>(null);
  const [documentPending, setDocumentPending] = useState<boolean>(false);

  useEffect(() => {
    setDocumentPending(true);
    if (!id) {
      setDocumentError('No ducoment ID provided.');
      setDocumentPending(false);
      return;
    }
    const ref = doc(db, collection, id);
    const unsub = onSnapshot(ref, (doc) => {
      if (doc.data()) {
        setDocument({ ...doc.data(), id: doc.id });
        setDocumentError(null);
      } else {
        setDocumentError('Document does not exist.');
      }
      setDocumentPending(false);
    },
    (err) => {
      if (err instanceof Error) {
        setDocumentError('Failed to get document.');
        setDocumentPending(false);
      }
    })
    return () => unsub();
  }, [collection, id])

  return { document, documentError, documentPending }
}