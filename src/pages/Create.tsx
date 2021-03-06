import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import { useCollection } from '../hooks/useColletion';
import { Category, UsersList, Project, User } from "../Interfaces/Interfaces";
import { Timestamp, arrayUnion } from 'firebase/firestore';
import { MultiValue, SingleValue } from 'react-select';
import { useAuthContext } from '../hooks/useAuthContext';
import { useFirestore } from '../hooks/useFirestore';

const categories: Category[] = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'marketing', label: 'Marketing' },
]

const Create = () => {
  let navigate = useNavigate();
  const { user } = useAuthContext();
  const [title, setTitle] = useState<string>('');
  const [details, setDetails] = useState<string>('');
  const [dueDate, setDueDate] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');
  const [category, setCategory] = useState<SingleValue<Category>>(null);
  const [assignedUsers, setAssignedUsers] = useState<MultiValue<UsersList>>([]);
  const { documents } = useCollection('users');
  const [users, setUsers] = useState<UsersList[]>([]);
  const [formError, setFormError] = useState<string | null>(null);

  const { firestoreError, firestorePending, addDocument } = useFirestore('projects');
  const { updateDocument, firestoreError: updateFirestoreError } = useFirestore('users');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);

    if (!category) {
      setFormError('Please select a project category.');
      return;
    }

    if (assignedUsers.length < 1) {
      setFormError('Please assign the project to at least 1 user.');
      return;
    }

    const assignedUsersList = assignedUsers.map(u => {
      return u.value;
    })

    const project: Project = {
      title,
      details,
      category: category.value,
      dueDate: Timestamp.fromDate(new Date(dueDate)),
      createdBy: user!,
      assignedUsersList,
      comments: [],
      completed: false
    }
  
    const addedProjectID = await addDocument(project);

    // set notification for each selected user
    for (const u of assignedUsersList) {
      await updateDocument(u.id, {
        newMsg: true,
        notifications: arrayUnion ({
          msg: `You have been assigned to a new project - ${title}`,
          projectID: addedProjectID,
          createdAt: Timestamp.fromDate(new Date())
        })
      })
    }

    if (!firestoreError) {
      navigate('/');
    }
    
  }

  useEffect(() => {
    const today: Date = new Date();
    const current: string = today.getFullYear() + '-' + (('0' + (today.getMonth() + 1))).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
    setCurrentDate(current);

    // get all users from firestore, store in an array for Select.
    if (documents) {
      const options: UsersList[] = documents.map((user: User) => {
        return { 
          value: user,
          label: user.displayName
        };
      })
      setUsers(options);
    }

  }, [documents])

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <h2>Create a new project</h2>

        <label>
          <span>Project title: </span>
          <input
            required
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>

        <label>
          <span>Project details: </span>
          <textarea
            required
            onChange={(e) => setDetails(e.target.value)}
            value={details}
          ></textarea>
        </label>

        <label>
          <span>Project due date: </span>
          <input
            required
            type="date"
            min={currentDate}
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
          />
        </label>

        <label>
          <span>Project Category: </span>
          <Select
            options={categories}
            onChange={(option) => setCategory(option)}
          />
        </label>

        <label>
          <span>Assign to: </span>
          <Select
            options={users}
            onChange={(option) => setAssignedUsers(option)}
            isMulti
          />
        </label>
        

        {firestorePending && <button disabled>Loading</button>}
        {!firestorePending && <button>Add Project</button>}

        {/* check for errors */}
        {formError && <div className='error'>{formError}</div>}
        {firestoreError && <div className='error'>{firestoreError}</div>}
        {updateFirestoreError && <div className="error">{updateFirestoreError}</div>}
        
      </form>
    </div>
  )
}

export default Create;