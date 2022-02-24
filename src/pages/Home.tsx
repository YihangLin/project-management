import { useCollection } from "../hooks/useColletion";
import ProjectList from "../components/ProjectList";
import '../scss/Home.scss';

const Home = () => {
  const { documents } = useCollection('projects');

  return (
    <div className="home">
      {documents && documents.map(doc => (
        <ProjectList key={doc.id} project={doc} />
      ))}
      {/* <h1>home</h1> */}
    </div>
  )
}

export default Home;