import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";


export const useCollection = (c: string) => {

  const [documents, setDocuments] = useState<any[] | null>(null);

  useEffect(() => {
    let ref = collection(db, c);

    const unsub = onSnapshot(ref, (snapshot) => {
      let results:any[] = [];
      snapshot.docs.forEach(doc => {
        results.push({ ...doc.data(), id: doc.id });
      })
      setDocuments(results);
    })

    return () => unsub();

  }, [c])

  return { documents };
}