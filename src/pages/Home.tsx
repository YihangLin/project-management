import ProjectList from "../components/ProjectList";
import '../scss/Home.scss';
import { useAuthContext } from "../hooks/useAuthContext";


const Home = () => {
  const { projects } = useAuthContext();
  
  return (
    <div className='home-container'>
      {projects.length > 0 ? <p>Total of {projects.length} Project(s): </p> : <p>No projects yet.</p>}
      <div className="home">
        {projects.length > 0 && projects.map(doc => (
          <ProjectList key={doc.id} project={doc} />
        ))}
      </div>
    </div>
  )
}

export default Home;