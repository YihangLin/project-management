import { auth, db } from "../firebase/config";
import { signOut, getAuth } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";
import { doc, updateDoc } from 'firebase/firestore';

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = async () => {
    try {
      const currentAuth = getAuth();
      const currentAuthUser = currentAuth.currentUser;

      if (currentAuthUser) {
        await signOut(auth);
        dispatch({ type: 'LOGOUT' });
        const userRef = doc(db, 'users', currentAuthUser.uid);
        await updateDoc(userRef, {
          online: false
        });
      } else {
        throw new Error('No user is signed in.');
      }
      // console.log('Log out');
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message)
      }
    }
  }
  
  return { logout };
}
