import { ProjectProps, User } from "../Interfaces/Interfaces";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useFirestore } from "../hooks/useFirestore";

const ProjectContent: React.FC<ProjectProps> = ({ project }) => {
  const { user } = useAuthContext();
  const { firestoreError, firestorePending, updateDocument, deleteDocument } = useFirestore('projects');
  let navigate = useNavigate();

  const handleComplete = async () => {
    await updateDocument(project.id, {
      completed: true
    })
  }

  const handleDelete = async () => {
    await deleteDocument(project.id);

    if (!firestoreError) {
      navigate('/');
    }
  }

  return (
    <>
      <div className="project-detail-title">
        <h2>{project.title}</h2>
        {project.completed &&
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24"  fill="#4285F4"><rect fill="none" height="24" width="24"/><path d="M22,5.18L10.59,16.6l-4.24-4.24l1.41-1.41l2.83,2.83l10-10L22,5.18z M19.79,10.22C19.92,10.79,20,11.39,20,12 c0,4.42-3.58,8-8,8s-8-3.58-8-8c0-4.42,3.58-8,8-8c1.58,0,3.04,0.46,4.28,1.25l1.44-1.44C16.1,2.67,14.13,2,12,2C6.48,2,2,6.48,2,12 c0,5.52,4.48,10,10,10s10-4.48,10-10c0-1.19-0.22-2.33-0.6-3.39L19.79,10.22z"/></svg>
            <span>Done</span>
          </div>
        }  
      </div>

      <span className="project-detail-createdby">Created By: {project.createdBy.displayName}</span>
      <p className="project-detail-content">{project.details}</p>
      <Link to={`/${project.category}`} className="project-detail-category">{project.category}</Link>
      <h4>Due Date: {project.dueDate.toDate().toDateString()}</h4>
      <span>Assigned to: </span>

      <div className="project-detail-assigned-users">
        {project.assignedUsersList.map((u: User) => (
          <div className="project-detail-user" key={u.id}>
            <div className="project-detail-user-img">
              <img src={u.photoURL || undefined} alt="assigned user" />
            </div>
            <p>{u.displayName}</p>
          </div>
        ))}
      </div>

      { user!.id === project.createdBy.id &&
        <div className="project-detail-update-project">
          {(!project.completed && !firestorePending) && <button onClick={handleComplete}>Mark as Completed</button>}
          {(!project.completed && firestorePending) && <button disabled>Loading</button>}

          {!firestorePending && <button onClick={handleDelete}>Delete</button>}
          {firestorePending && <button disabled>Loading</button>}
        </div>
      }

    </>
  )
}

export default ProjectContent;