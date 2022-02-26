// import { useAuthContext } from "../hooks/useAuthContext";
// import { useEffect, useState } from "react";
// import { ProjectWithID } from '../Interfaces/Interfaces';
import ProjectList from "../components/ProjectList";
import { useFilter } from "../hooks/useFilter";

const MyTasks = () => {
  const { filteredProjects } = useFilter('me');

  // const { projects, user } = useAuthContext();
  // const [filteredProjects, setFilteredProjects] = useState<ProjectWithID[]>([]);

  // useEffect(() => {
  //   if (projects.length > 0 && user !== null) {
  //     const newProjects = projects.filter((project) => {
      
  //       let assignedToMe: Boolean = false;
  //       project.assignedUsersList.forEach(u => {
  //         if (u.id === user.id) {
  //           assignedToMe = true;
  //         }
  //       })
  //       return assignedToMe;
  //     })
  //     setFilteredProjects(newProjects);
  //   }
  // }, [projects])
  return (
    <div className="home-container">
      {filteredProjects.length > 0 ? <p>You've been assigned to {filteredProjects.length} Project(s):</p> : <p>No projects yet.</p>}
      <div className="home">
        {filteredProjects.length > 0 && filteredProjects.map(doc => (
          <ProjectList key={doc.id} project={doc} />
        ))}
        {/* <Loading /> */}
      </div>
    </div>
  )
}

export default MyTasks;