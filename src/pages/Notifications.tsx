import { useAuthContext } from "../hooks/useAuthContext";
import { useDocument } from "../hooks/useDocument";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import { Notification } from "../Interfaces/Interfaces";
import { formatDistanceToNow } from "date-fns";
import { useFirestore } from "../hooks/useFirestore";
import { useEffect } from "react";
import '../scss/Notifications.scss';
import { db } from "../firebase/config";
import { doc, updateDoc } from "firebase/firestore";

const Notifications = () => {
  const { user } = useAuthContext();
  const { documentError, documentPending, document } = useDocument('users', user!.id);
  const { firestoreError, updateDocument, firestorePending } = useFirestore('users');

  useEffect(() => {

    const userRef = doc(db, 'users', user!.id);

    // update user's notification status.
    const updateUserNotification = async () => {
      await updateDoc(userRef, {
        newMsg: false
      })
    }

    updateUserNotification();
  }, [user])

  const handleDeleteAll = async () => {
    await updateDocument(user!.id, {
      notifications: []
    })
  }

  return (
    <>
      {firestoreError && <div className="error">{firestoreError}</div>}
      {documentError && <div className="error">{documentError}</div>}
      {documentPending && <Loading />}
      {(document && document.notifications.length > 0) ? 
        <>
          <p>Notifications: </p>
          <div className="notifications-detail">
            {document.notifications.map((notification: Notification, index: number) => (
              <Link to={`/project/${notification.projectID}`} key={index}>
                <span>{notification.msg}, Click for Detail</span>
                <span>{formatDistanceToNow(notification.createdAt.toDate(), {addSuffix: true})}</span>
              </Link>
            ))}
          </div> 
          {firestorePending && <button disabled className="notifications-delete-btn">Loading</button>}
          {!firestorePending && <button onClick={handleDeleteAll} className="notifications-delete-btn">Delete All</button>}
        </>
      : 
        <p>You have no notifications.</p>}
    </>
  )
}

export default Notifications;