import ProjectList from "../components/ProjectList";
import { useFilter } from "../hooks/useFilter";

const MyTasks = () => {
  const { filteredProjects } = useFilter('me');

  return (
    <div className="home-container">
      {filteredProjects.length > 0 ? <p>You've been assigned to {filteredProjects.length} Project(s):</p> : <p>No projects yet.</p>}
      <div className="home">
        {filteredProjects.length > 0 && filteredProjects.map(doc => (
          <ProjectList key={doc.id} project={doc} />
        ))}
      </div>
    </div>
  )
}

export default MyTasks;