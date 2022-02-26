import { useState, useEffect } from "react";
import { auth, storage, db } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { useAuthContext } from "./useAuthContext";
import { User } from "../Interfaces/Interfaces";
// import { User } from "../context/AuthContext";

export const useSignup = () => {
  const [error, setError] = useState<null | string>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isCancelled, setIsCancelled] = useState<boolean>(false);
  const { dispatch } = useAuthContext();

  const signup = async (displayName:string, email:string, password:string, thumbnail:File) => {
    setIsPending(true);
    setError(null);

    // console.log(email);

    try {
      // signup user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      if (!res) {
        throw new Error('Could not sign up user.');
      }

      const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`;
      const storageRef = ref(storage, uploadPath);
      const uploadImg = await uploadBytes(storageRef, thumbnail);
      const imgUrl = await getDownloadURL(uploadImg.ref);

      // await res.user.updateProfile({ displayName, photoURL: imgUrl });
      await updateProfile(res.user, { displayName, photoURL: imgUrl });

      await setDoc(doc(db, 'users', res.user.uid), {
        newMsg: false,
        displayName,
        photoURL: imgUrl,
        notifications: [],
      })

      let currentUser: User = {
        id: res.user.uid,
        displayName: res.user.displayName,
        photoURL: res.user.photoURL
      }

      dispatch({ type: 'LOGIN', payload: currentUser });

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }

    } catch(err) {
      if (!isCancelled) {
        if (err instanceof Error) {
          // console.log(err.code)
          setError(err.message);
        }
        setIsPending(false);
      }
      
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true);
  }, [])

  return { signup, error, isPending }
}