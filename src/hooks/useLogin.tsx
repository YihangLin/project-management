import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";

import { useState, useEffect } from "react";
import { useAuthContext } from "./useAuthContext";
import { User } from "../context/AuthContext";

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isCancelled, setIsCancelled] = useState<boolean>(false);
  const { dispatch } = useAuthContext();

  const login = async (email: string, password: string) => {
    setError(null);
    setIsPending(true);

    try {
      // login user
      const res = await signInWithEmailAndPassword(auth, email, password);

      let currentUser: User = {
        id: res.user.uid,
        photoURL: res.user.photoURL,
        displayName: res.user.displayName
      }

      dispatch({ type: 'LOGIN', payload: currentUser });
      // console.log(res);

      // update state
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }

    } catch (err) {
      if (!isCancelled) {
        if (err instanceof Error) {
          console.log(err.message);
          setError(err.message);
        }
        setIsPending(false);
      }    
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true);
  }, [])

  return { login, error, isPending };
}
