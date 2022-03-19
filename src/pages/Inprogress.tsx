import ProjectList from "../components/ProjectList";
import { useFilter } from "../hooks/useFilter";

const InProgress = () => {
  const { filteredProjects } = useFilter('inprogress');

  return (
    <div className="home-container">
      {filteredProjects.length > 0 ? <p>Total of {filteredProjects.length} Project(s) In Progress:</p> : <p>No projects yet.</p>}
      <div className="home">
        {filteredProjects.length > 0 && filteredProjects.map(doc => (
          <ProjectList key={doc.id} project={doc} />
        ))}
      </div>
    </div>
  )
}

export default InProgress;