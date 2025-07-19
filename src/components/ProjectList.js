import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db, collection, getDocs } from "../firebaseConfig";
import "./ProjectList.css"; // Import CSS for styling

function ProjectList() {
  const { userId } = useParams();
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      const projectsCollection = collection(db, `users/${userId}/projects`); // Fixed syntax
      const projectSnapshot = await getDocs(projectsCollection);
      const projectList = projectSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProjects(projectList);
    };

    fetchProjects();
  }, [userId]);

  return (
    <>
      <div className="project-list-container">
        <h1>User Projects</h1>
        <div className="project-grid">
          {projects.map((project, idx) => (
            <div
              className="project-card-modern"
              key={project.id}
              onClick={() => navigate(`/user/${userId}/project/${project.id}`)}
              style={{ boxShadow: '0 2px 12px rgba(0,82,204,0.07)', transition: 'box-shadow 0.2s', cursor: 'pointer', background: 'linear-gradient(135deg, #f8fafc 60%, #e3e7ed 100%)' }}
            >
              <div className="project-card-header">
                <span className="project-number">Project #{idx + 1}</span>
                <span className="project-name">{project.projectName}</span>
              </div>
              <div className="project-card-details">
                <span>Floor: {project.selectedFloor}</span>
                <span>Created: {project.createdAt?.toDate().toLocaleString()}</span>
                {project.sitebuilder && (
                  <span style={{ color: '#00bcd4', fontWeight: 600 }}>Sitebuilder: {project.sitebuilder}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ProjectList;
