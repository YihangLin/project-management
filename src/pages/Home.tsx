import { useCollection } from "../hooks/useColletion";

const Home = () => {
  const { documents } = useCollection('users');

  return (
    <div>
      {documents && documents.map(doc => (
        <div key={doc.id}>
          <p>{doc.displayName}</p>
        </div>
      ))}
      {/* <h1>home</h1> */}
    </div>
  )
}

export default Home;