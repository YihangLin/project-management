import React, { createContext, useReducer, useEffect } from "react";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from 'firebase/auth';
import { User, Actions, InitialState, ContextType } from "../Interfaces/Interfaces";
import { useCollection } from "../hooks/useColletion";

export const AuthContext = createContext<ContextType | null>(null);

export const authReducer = (state: InitialState, action: Actions) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT': 
      return { ...state, user: null };
    case 'AUTH_IS_READY':
      return { ...state, user: action.payload, authIsReady: true };
    case 'PROJECTS_ARE_READY':
      return { ...state, projects: action.payload };
    case 'ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

export const AuthContextProvider: React.FC = ({ children }) => {
  const { documents, collectionError } = useCollection('projects', 'dueDate');
  const [state, dispatch] = useReducer(authReducer , {
    user: null,
    authIsReady: false,
    projects: [],
    error: null
  })

  useEffect(() => {
    // check if user is logged in or not
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

  useEffect(() => {
    // get projects from firestore
    if (documents) {
      dispatch({ type: 'PROJECTS_ARE_READY', payload: documents });
    }

    if (collectionError) {
      dispatch({ type: 'ERROR', payload: collectionError });
    }
  }, [documents, collectionError])

  return (
    <AuthContext.Provider value={{...state, dispatch}}>
      {children}
    </AuthContext.Provider>
  )
}