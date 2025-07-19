import React, { useState, useEffect } from "react";
import { db } from "./firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Navbar from "./components/NavBar";
import "./AdminPanel.css";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedProjects, setSelectedProjects] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, "users");
        const usersSnapshot = await getDocs(usersCollection);
        const usersData = usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const fetchProjects = async (userId) => {
    try {
      const projectsCollection = collection(db, `users/${userId}/projects`);
      const projectsSnapshot = await getDocs(projectsCollection);
      const projectsData = projectsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setSelectedProjects(projectsData);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    fetchProjects(user.id);
  };

  return (
    <>
      <Navbar />
      <div className="admin-panel-root">
        <aside className="admin-sidebar">
          <h2>Users</h2>
          <ul className="user-list">
            {users.map((user) => (
              <li
                key={user.id}
                className={`user-list-item${selectedUser && selectedUser.id === user.id ? " selected" : ""}`}
                onClick={() => handleUserClick(user)}
              >
                <span className="user-avatar">{user.name?.[0]?.toUpperCase() || "U"}</span>
                <div className="user-info">
                  <span className="user-name">{user.name}</span>
                  <span className="user-email">{user.email}</span>
                </div>
              </li>
            ))}
          </ul>
        </aside>
        <main className="admin-main">
          {selectedUser ? (
            <div className="user-details-section">
              <div className="user-details-header">
                <h2>{selectedUser.name}</h2>
                <span className="user-contact">{selectedUser.contact}</span>
                <span className="project-count">Projects: {selectedProjects.length}</span>
              </div>
              <div className="project-list-section">
                <h3>Projects</h3>
                {selectedProjects.length > 0 ? (
                  <div className="project-list-yo">
                    {selectedProjects.map((project) => (
                      <div key={project.id} className="project-card-yo">
                        <div className="project-card-header">
                          <span className="project-name">{project.projectName}</span>
                          <span className="project-floor">Floor: {project.selectedFloor}</span>
                        </div>
                        <div className="project-card-date">
                          Created: {project.createdAt?.toDate().toLocaleString()}
                        </div>
                        <div className="project-images">
                          {project.selectedBathroom && <img src={project.selectedBathroom} alt="Bathroom" />}
                          {project.selectedKitchen && <img src={project.selectedKitchen} alt="Kitchen" />}
                          {project.selectedLighting && <img src={project.selectedLighting} alt="Lighting" />}
                          {project.selectedWindow && <img src={project.selectedWindow} alt="Window" />}
                          {project.selectedSecondFacadeImage && <img src={project.selectedSecondFacadeImage} alt="Facade" />}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="no-projects">No projects found.</p>
                )}
              </div>
            </div>
          ) : (
            <div className="select-user-placeholder">
              <h2>Select a user to view details and projects</h2>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default AdminPanel;
