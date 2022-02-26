// import { useAuthContext } from "../hooks/useAuthContext";
// import { useEffect, useState } from "react";
// import { ProjectWithID } from '../Interfaces/Interfaces';
import ProjectList from "../components/ProjectList";
import { useFilter } from "../hooks/useFilter";

const Marketing = () => {
  const { filteredProjects } = useFilter('marketing');

  // const { projects } = useAuthContext();
  // const [filteredProjects, setFilteredProjects] = useState<ProjectWithID[]>([]);

  // useEffect(() => {
  //   if (projects.length > 0) {
  //     const newProjects = projects.filter((project) => (
  //       project.category === 'marketing'
  //     ))
  //     setFilteredProjects(newProjects);
  //   }
  // }, [projects])
  return (
    <div className="home-container">
      {filteredProjects.length > 0 ? <p>Total of {filteredProjects.length} Project(s) in Marketing:</p> : <p>No projects yet.</p>}
      <div className="home">
        {filteredProjects.length > 0 && filteredProjects.map(doc => (
          <ProjectList key={doc.id} project={doc} />
        ))}
        {/* <Loading /> */}
      </div>
    </div>
  )
}

export default Marketing;