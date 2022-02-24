import React, { createContext, useReducer, useEffect } from "react";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from 'firebase/auth';
// interface Props {
//   children: () => JSX.Element
// }

interface Notifications {
  projectID: number,
  msg: string
}

export interface User {
  displayName: string | null,
  photoURL: string | null,
  id: string,
  notifications?: Notifications[],
  newMsg?: boolean
}

type Actions = 
  { type: 'LOGIN'; payload: User } | 
  { type: 'LOGOUT'; } |
  { type: 'AUTH_IS_READY'; payload: User | null }

interface UserState {
  user: User | null ,
  authIsReady: boolean
}

interface ContextType extends UserState {
  dispatch: React.Dispatch<Actions>
}

//{ state: UserState; dispatch: React.Dispatch<Actions> } | null

export const AuthContext = createContext<ContextType | null>(null);

export const authReducer = (state: UserState, action: Actions) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT': 
      return { ...state, user: null };
    case 'AUTH_IS_READY':
      return { user: action.payload, authIsReady: true };
    default:
      return state;
  }
}

export const AuthContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer , {
    user: null,
    authIsReady: false
  })

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      if (user) {
        let currentUser: User = {
          displayName: user.displayName,
          id: user.uid,
          photoURL: user.photoURL
        }
        dispatch({ type: 'AUTH_IS_READY', payload: currentUser });
      } else {
        dispatch({ type: 'AUTH_IS_READY', payload: null });
      }
      unsub();
    })
  }, [])

  console.log('AuthContext state: ', state);

  return (
    <AuthContext.Provider value={{...state, dispatch}}>
      {children}
    </AuthContext.Provider>
  )
}