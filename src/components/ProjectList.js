import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db, collection, getDocs } from "../firebaseConfig";
import Navbar from "./NavBar"; // Import Navbar
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
      <Navbar /> {/* Include Navbar */}
      <div className="project-list-container">
        <h1>User Projects</h1>
        <div className="project-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card" onClick={() => navigate(`/user/${userId}/project/${project.id}`)}>
              <h2>{project.projectName}</h2>
              <p><strong>Created At:</strong> {new Date(project.createdAt.seconds * 1000).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ProjectList;
