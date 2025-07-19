import React, { useEffect, useState } from "react";
import { db, collection, getDocs } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import "./UserList.css"; // Import CSS for styling

function UserList() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const userCollection = collection(db, "users");
      const userSnapshot = await getDocs(userCollection);
      const userList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(userList);
    };

    fetchUsers();
  }, []);

  return (
    <>
      <div className="user-list-container">
        <h1>Users</h1>
        <div className="user-list-grid">
          {users.map((user) => (
            <div
              className="user-card-modern beautiful-user-card"
              key={user.id}
              onClick={() => navigate(`/user/${user.id}/projects`)}
              style={{ boxShadow: '0 2px 12px rgba(0,82,204,0.07)', transition: 'box-shadow 0.2s, transform 0.18s', cursor: 'pointer', background: 'linear-gradient(135deg, #f8fafc 60%, #e3e7ed 100%)' }}
            >
              <div className="user-card-header">{user.name}</div>
              <div className="user-card-email">{user.email}</div>
              {user.contact && (
                <div className="user-card-contact">{user.contact}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default UserList;
