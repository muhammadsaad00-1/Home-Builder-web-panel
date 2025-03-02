import React, { useEffect, useState } from "react";
import { db, collection, getDocs } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import Navbar from "./NavBar"; // Import Navbar
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
      <Navbar /> {/* Include the Navbar */}
      <div className="user-list-container">
        <h1>Users</h1>
        <div className="user-grid">
          {users.map(user => (
            <div key={user.id} className="user-card" onClick={() => navigate(`/user/${user.id}`)}>
              <p className="user-name">{user.name}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default UserList;
