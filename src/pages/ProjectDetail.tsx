import { useDocument } from "../hooks/useDocument";
import { useParams } from "react-router-dom";

import Loading from "../components/Loading";

import '../scss/ProjectDetail.scss';

import ProjectContent from "../components/ProjectContent";
import ProjectComments from "../components/ProjectComments";
import OnlineUsers from "../components/OnlineUsers";

const ProjectDetail = () => {
  const { id } = useParams();
  // console.log(id);
  // if (id) {
  const { document, documentError, documentPending } = useDocument('projects', id);

  return (
    <>
      {documentError && <div className="error">{documentError}</div>}

      {documentPending && <Loading />}
      <div className="project-detail-container">
        {document && 
          <div className="project-detail">
            <ProjectContent project={document}/>
            <ProjectComments project={document}/>
          </div>
        }
        <OnlineUsers />
      </div>
    </>
  )
}

export default ProjectDetail;