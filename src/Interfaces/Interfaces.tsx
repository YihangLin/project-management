import { Timestamp } from 'firebase/firestore';


export interface Notification {
  projectID: number,
  msg: string,
  createdAt: Timestamp
}

export interface User {
  displayName: string | null,
  photoURL: string | null,
  id: string,
}

export interface Project {
  title: string,
  details: string,
  category: string,
  createdBy: User,
  dueDate: Timestamp,
  assignedUsersList: User[],
  comments: Comment[],
  completed: boolean
}

export interface ProjectWithID extends Project {
  id: string
}

export interface ProjectProps {
  project: ProjectWithID
}

export type Actions = 
  { type: 'LOGIN'; payload: User } | 
  { type: 'LOGOUT'; } |
  { type: 'AUTH_IS_READY'; payload: User | null } |
  { type: 'ERROR', payload: string } |
  { type: 'PROJECTS_ARE_READY', payload: ProjectWithID[]}

export interface InitialState {
  user: User | null ,
  authIsReady: boolean,
  projects: ProjectWithID[],
  error: string | null
}

export interface ContextType extends InitialState {
  dispatch: React.Dispatch<Actions>
}

export interface Category {
  value: string,
  label: string
}

export interface UsersList {
  value: User,
  label: string | null
}

export interface Comment extends User {
  content: string,
  createdAt: Timestamp
}


