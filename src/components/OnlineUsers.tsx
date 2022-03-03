import { useCollection } from "../hooks/useColletion";
import '../scss/OnlineUsers.scss';

const OnlineUsers = () => {
  const { documents, collectionError } = useCollection('users');

  return (
    <div className="online-users">
      {collectionError && <div>{collectionError}</div>}
      <p>All Users:</p>
      {documents && documents.map(doc => (
        <div key={doc.id} className='online-user-profile'>
          <div className="online-user-photo">
            <img src={doc.photoURL} alt="users" />
          </div>
          {doc.online && <span className="online-user-indicator"></span>}
          <span>{doc.displayName}</span>
        </div>
      ))}
    </div>
  )

}

export default OnlineUsers;