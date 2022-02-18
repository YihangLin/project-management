import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = async () => {
    try {
      await signOut(auth);
      dispatch({ type: 'LOGOUT' });
      console.log('Log out');
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message)
      }
    }
  }
  
  return { logout };
}
