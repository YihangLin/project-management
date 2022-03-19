import { ProjectProps } from "../Interfaces/Interfaces";
import { Link } from "react-router-dom";
import '../scss/ProjectList.scss';
import Comments from '../assets/comments.svg';

const ProjectList: React.FC<ProjectProps> = ({ project }) => {

  const categoryColor = (category: string) => {
    switch (category) {
      case 'development':
        return <span className='development'>Development</span>;
      case 'design':
        return <span className='design'>Design</span>;
      case 'marketing':
        return <span className='marketing'>Marketing</span>;
      default:
        return <span>{category}</span>
    }
  }

  return (
    <Link to={`/project/${project.id}`} className='project-list'>
      {!project.completed && <h3 className='status inwork'>IN WORK</h3>}
      {project.completed && <h3 className='status completed'>COMPLETED</h3>}
      <div className='project-list-detail'>
        <h3>{project.title}</h3>
        <p>{project.details}</p>
        <div className='project-list-category-users'>
          {categoryColor(project.category)}
          <div className='project-list-users'>
            {project.assignedUsersList.map(u => (
              <div className='project-list-user-pic' key={u.id}>
                <img src={u.photoURL || undefined} alt="user" />
              </div>
            ))}
          </div>
        </div>
        <div className='project-list-comments-dueDate'>
          <div className='project-list-comments'>
            <img src={Comments} alt="comments" />
            {project.comments.length > 0 && <span>{project.comments.length}</span>}
          </div>
          <div>
            {project.dueDate.toDate().toDateString()}
          </div>
        </div>
      </div>
    </Link>
  )

}

export default ProjectList;