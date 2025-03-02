import React, { useState, useEffect } from "react";
import { db } from "./firebaseConfig";
import { collection, getDocs, doc } from "firebase/firestore";

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
    <div>
      <h1>Admin Panel</h1>
      <div style={{ display: "flex" }}>
        {/* User List */}
        <div style={{ width: "30%", borderRight: "1px solid #ddd", padding: "10px" }}>
          <h2>Users</h2>
          {users.map((user) => (
            <div
              key={user.id}
              style={{ cursor: "pointer", padding: "10px", borderBottom: "1px solid #ddd" }}
              onClick={() => handleUserClick(user)}
            >
              <strong>{user.name}</strong> ({user.email})
            </div>
          ))}
        </div>
        
        {/* User Details & Projects */}
        <div style={{ width: "70%", padding: "10px" }}>
          {selectedUser ? (
            <div>
              <h2>User Details</h2>
              <p><strong>Name:</strong> {selectedUser.name}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Contact:</strong> {selectedUser.contact}</p>
              <h3>Projects</h3>
              {selectedProjects.length > 0 ? (
                selectedProjects.map((project) => (
                  <div key={project.id} style={{ padding: "10px", border: "1px solid #ddd", marginBottom: "10px" }}>
                    <h4>{project.projectName}</h4>
                    <p><strong>Floor:</strong> {project.selectedFloor}</p>
                    <p><strong>Created At:</strong> {project.createdAt?.toDate().toLocaleString()}</p>
                    <img src={project.selectedBathroom} alt="Bathroom" width="100" />
                    <img src={project.selectedKitchen} alt="Kitchen" width="100" />
                    <img src={project.selectedLighting} alt="Lighting" width="100" />
                    <img src={project.selectedWindow} alt="Window" width="100" />
                    <img src={project.selectedSecondFacadeImage} alt="Facade" width="100" />
                  </div>
                ))
              ) : (
                <p>No projects found.</p>
              )}
            </div>
          ) : (
            <p>Select a user to view details.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
