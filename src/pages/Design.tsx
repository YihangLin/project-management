// import { useAuthContext } from "../hooks/useAuthContext";
// import { useEffect, useState } from "react";
// import { ProjectWithID } from '../Interfaces/Interfaces';
import ProjectList from "../components/ProjectList";
import { useFilter } from "../hooks/useFilter";

const Design = () => {
  const { filteredProjects } = useFilter('design');
  // const { projects } = useAuthContext();
  // const [filteredProjects, setFilteredProjects] = useState<ProjectWithID[]>([]);

  // useEffect(() => {
  //   if (projects.length > 0) {
  //     const newProjects = projects.filter((project) => (
  //       project.category === 'design'
  //     ))
  //     setFilteredProjects(newProjects);
  //   }
  // }, [projects])
  return (
    <div className="home-container">
      {filteredProjects.length > 0 ? <p>Total of {filteredProjects.length} Project(s) in Design:</p> : <p>No projects yet.</p>}
      <div className="home">
        {filteredProjects.length > 0 && filteredProjects.map(doc => (
          <ProjectList key={doc.id} project={doc} />
        ))}
        {/* <Loading /> */}
      </div>
    </div>
  )
}

export default Design;