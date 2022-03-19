import ProjectList from "../components/ProjectList";
import { useFilter } from "../hooks/useFilter";

const Marketing = () => {
  const { filteredProjects } = useFilter('marketing');

  return (
    <div className="home-container">
      {filteredProjects.length > 0 ? <p>Total of {filteredProjects.length} Project(s) in Marketing:</p> : <p>No projects yet.</p>}
      <div className="home">
        {filteredProjects.length > 0 && filteredProjects.map(doc => (
          <ProjectList key={doc.id} project={doc} />
        ))}
      </div>
    </div>
  )
}

export default Marketing;