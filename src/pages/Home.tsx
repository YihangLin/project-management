// import { useCollection } from "../hooks/useColletion";
import ProjectList from "../components/ProjectList";
import '../scss/Home.scss';
import { useAuthContext } from "../hooks/useAuthContext";


const Home = () => {
  const { projects } = useAuthContext();
  // const { documents, collectionError } = useCollection('test');


  
  return (
    <div className='home-container'>
      {projects.length > 0 ? <p>Total of {projects.length} Project(s): </p> : <p>No projects yet.</p>}
      <div className="home">
        {projects.length > 0 && projects.map(doc => (
          <ProjectList key={doc.id} project={doc} />
        ))}
        {/* <h1>home</h1> */}
      </div>
    </div>
  )
}

export default Home;