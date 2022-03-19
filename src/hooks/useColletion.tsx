import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot, orderBy, query, CollectionReference, Query } from "firebase/firestore";

export const useCollection = (_collection: string, _orderBy?: string) => {

  const [documents, setDocuments] = useState<any[] | null>(null);
  const [collectionError, setCollectionError] = useState<string | null>(null);

  useEffect(() => {
    let ref: CollectionReference | Query = collection(db, _collection);

    if (_orderBy) {
      ref = query(ref, orderBy(_orderBy));
    }

    // get a snapshot of a collection
    const unsub = onSnapshot(ref, (snapshot) => {
      let results:any[] = [];
      snapshot.docs.forEach(doc => {
        results.push({ ...doc.data(), id: doc.id });
      })
      setDocuments(results);
      setCollectionError(null);
    },
    (err) => {
      console.log('Fetch collection error: ', err);
      setCollectionError(`Could not fetch the data from collection: ${_collection}`)
    })

    return () => unsub();

  }, [_collection, _orderBy])

  return { documents, collectionError };
}