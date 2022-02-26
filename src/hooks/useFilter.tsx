import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState } from "react";
import { ProjectWithID } from '../Interfaces/Interfaces';

export const useFilter = (filter: string) => {
  const { projects, user } = useAuthContext();
  const [filteredProjects, setFilteredProjects] = useState<ProjectWithID[]>([]);

  useEffect(() => {
    if (projects.length > 0 && user !== null) {
      const newProjects = projects.filter((project) => {
        switch (filter) {
          case 'development':
          case 'marketing':
          case 'design':
            return project.category === filter;
          case 'me':
            let assignedToMe: boolean = false;
            project.assignedUsersList.forEach(u => {
              if (u.id === user.id) {
                assignedToMe = true;
              }
            })
            return assignedToMe;
          case 'inprogress':
            return project.completed === false;
          case 'completed':
            return project.completed === true;
          default:
            return true;
        }
      })

      setFilteredProjects(newProjects);
    }
    
  }, [projects, user, filter])

  return { filteredProjects }
}