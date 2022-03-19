import { useState, useEffect } from "react";
import { auth, db } from "../firebase/config";
import { signOut, getAuth } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";
import { doc, updateDoc } from 'firebase/firestore';

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isCancelled, setIsCancelled] = useState<boolean>(false);

  const logout = async () => {
    setIsPending(true);

    try {
      const currentAuth = getAuth();
      const currentAuthUser = currentAuth.currentUser;

      if (currentAuthUser) {
        const userRef = doc(db, 'users', currentAuthUser.uid);
        // update user online status
        await updateDoc(userRef, {
          online: false
        });

      // log out current user
        await signOut(auth);
        dispatch({ type: 'LOGOUT' });
      } else {
        throw new Error('No user is signed in.');
      }

      if (!isCancelled) {
        setIsPending(false);
      }

    } catch (err) {
      if (!isCancelled) {
        setIsPending(false);
        if (err instanceof Error) {
          console.log(err.message)
        }
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true);
  }, [])
  
  return { logout, isPending };
}
