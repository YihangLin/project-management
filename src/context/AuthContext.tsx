import React, { createContext, useReducer, useEffect } from "react";
import { auth } from "../firebase/config";
import { User, onAuthStateChanged } from 'firebase/auth';
// interface Props {
//   children: () => JSX.Element
// }

type Actions = 
  { type: 'LOGIN'; payload: User } | 
  { type: 'LOGOUT'; } |
  { type: 'AUTH_IS_READY'; payload: User }

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
      dispatch({ type: 'AUTH_IS_READY', payload: user! });
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