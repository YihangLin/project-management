import { useState } from "react";
import { ProjectProps, Comment } from "../Interfaces/Interfaces";
import { useFirestore } from "../hooks/useFirestore";
import { Timestamp, arrayUnion } from "firebase/firestore";
import { useAuthContext } from "../hooks/useAuthContext";
import { formatDistanceToNow } from 'date-fns';


const ProjectComments: React.FC<ProjectProps> = ({ project }) => {
  const { firestoreError, firestorePending, updateDocument } = useFirestore('projects');
  const { firestoreError: firestoreUpdateNotificationError, updateDocument: updateUserNotification } = useFirestore('users');
  const { user } = useAuthContext();
  const [newComment, setNewComment] = useState<string>('');



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const commentToAdd: Comment = {
      displayName: user!.displayName,
      photoURL: user!.photoURL,
      id: user!.id,
      content: newComment,
      createdAt: Timestamp.fromDate(new Date())
    }

    await updateDocument(project.id, {
      comments: [...project.comments, commentToAdd],
    });

    if (!firestoreError) {
      setNewComment('');
    }

    await updateUserNotification(project.createdBy.id, {
      newMsg: true,
      notifications: arrayUnion({
        msg: `${user!.displayName} commented on your project - ${project.title}`,
        projectID: project.id,
        createdAt: Timestamp.fromDate(new Date())
      })
    })
    // console.log(newComment);
  }

  return (
    <>
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

      {project.comments.length > 0 ? 
        <>
          {project.comments.map((comment: Comment, index: number) => (
            <div key={index}>
              <div className="project-detail-comment-user">
                <div className="project-detail-comment-user-img">
                  <img src={comment.photoURL || undefined} alt="users" />
                </div>

                <span>{comment.displayName}</span>
                <span className="project-detail-comment-date">{formatDistanceToNow(comment.createdAt.toDate(), {addSuffix: true})}</span>
              </div>
              
              <p className="project-detail-comment-content">{comment.content}</p>
            </div>
          ))}
        </> 
      : 
        <p>No comments yet.</p>}
    </>
  )
}

export default ProjectComments;