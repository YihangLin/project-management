import { useState } from "react";
import { useDocument } from "../hooks/useDocument";
import { useFirestore } from "../hooks/useFirestore";
import { useParams } from "react-router-dom";
import { User, Comment } from "../Interfaces/Interfaces";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { Timestamp } from "firebase/firestore";
import { formatDistanceToNow } from 'date-fns';

import '../scss/ProjectDetail.scss';

const ProjectDetail = () => {
  const { id } = useParams();
  // console.log(id);
  // if (id) {
  const { document, documentError } = useDocument('projects', id);
  const { user } = useAuthContext();
  const { firestoreError, updateDocument, firestorePending } = useFirestore('projects');
  const [newComment, setNewComment] = useState<string>('');
  // }

  // console.log(document);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const commentToAdd: Comment = {
      displayName: user!.displayName,
      photoURL: user!.photoURL,
      id: user!.id,
      content: newComment,
      createdAt: Timestamp.fromDate(new Date())
    }

    await updateDocument(id!, {
      comments: [...document.comments, commentToAdd],
    });

    if (!firestoreError) {
      setNewComment('');
    }
    // console.log(newComment);
  }

  return (
    <div>
      {documentError && <div className="error">{documentError}</div>}
      {document && 
        <div className="project-detail">
          <div className="project-detail-title">
            <h2>{document.title}</h2>
            {document.completed &&
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24"  fill="#4285F4"><rect fill="none" height="24" width="24"/><path d="M22,5.18L10.59,16.6l-4.24-4.24l1.41-1.41l2.83,2.83l10-10L22,5.18z M19.79,10.22C19.92,10.79,20,11.39,20,12 c0,4.42-3.58,8-8,8s-8-3.58-8-8c0-4.42,3.58-8,8-8c1.58,0,3.04,0.46,4.28,1.25l1.44-1.44C16.1,2.67,14.13,2,12,2C6.48,2,2,6.48,2,12 c0,5.52,4.48,10,10,10s10-4.48,10-10c0-1.19-0.22-2.33-0.6-3.39L19.79,10.22z"/></svg>
                <span>Done</span>
              </div>
            }
            
          </div>
          <span className="project-detail-createdby">Created By: {document.createdBy.displayName}</span>

          <p className="project-detail-content">{document.details}</p>

          <Link to={`/${document.category}`} className="project-detail-category">{document.category}</Link>


          <h4>Due Date: {document.dueDate.toDate().toDateString()}</h4>

          <span>Assigned to: </span>

          <div className="project-detail-assigned-users">

            {document.assignedUsersList.map((u: User) => (
              <div className="project-detail-user" key={u.id}>
                <div className="project-detail-user-img">
                  <img src={u.photoURL || undefined} alt="assigned user" />
                </div>
                <p>{u.displayName}</p>
              </div>
            ))}
          </div>

          <h3>Comments:</h3>
          
          <form onSubmit={handleSubmit}>
            <label>
              <input
                type='text'
                required
                onChange={(e) => setNewComment(e.target.value)}
                value={newComment}
                placeholder='Leave a comment...'
              >
              </input>
            </label>

            {!firestorePending && <button>Submit</button>}
            {firestorePending && <button disabled>Loading</button>}

            {firestoreError && <div className="error">{firestoreError}</div>}
          </form>

          {document.comments.length > 0 ? 
            <>
              {document.comments.map((comment: Comment, index: number) => (
                <div key={index}>
                  <div className="project-detail-comment-user">
                    <div className="project-detail-comment-user-img">
                      <img src={comment.photoURL || undefined} alt="users" />
                    </div>

                    {/* <div> */}
                      <span>{comment.displayName}</span>
                      <span className="project-detail-comment-date">{formatDistanceToNow(comment.createdAt.toDate(), {addSuffix: true})}</span>
                    {/* </div> */}
                  </div>
                  <p className="project-detail-comment-content">{comment.content}</p>
                </div>
              ))}
            </> 
          : 
            <p>No comments yet.</p>}

        </div>
      }
      <div>
        <p>Users</p>
      </div>
    </div>
  )
}

export default ProjectDetail;