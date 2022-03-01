import { useDocument } from "../hooks/useDocument";
import { useParams } from "react-router-dom";

import Loading from "../components/Loading";

import '../scss/ProjectDetail.scss';

import ProjectContent from "../components/ProjectContent";
import ProjectComments from "../components/ProjectComments";

const ProjectDetail = () => {
  const { id } = useParams();
  // console.log(id);
  // if (id) {
  const { document, documentError, documentPending } = useDocument('projects', id);

  return (
    <div>
      {documentError && <div className="error">{documentError}</div>}

      {documentPending && <Loading />}

      {document && 
        <div className="project-detail">
          <ProjectContent project={document}/>
          <ProjectComments project={document}/>
        </div>
      }
      <div>
        <p>Users</p>
      </div>
    </div>
  )
}

export default ProjectDetail;