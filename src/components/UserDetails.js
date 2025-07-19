import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db, doc, getDoc } from "../firebaseConfig";
import "./UserDetails.css"; // Import CSS for styling

function UserDetails() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const userDoc = doc(db, "users", userId);
      const userSnap = await getDoc(userDoc);
      if (userSnap.exists()) {
        setUser(userSnap.data());
      }
    };

    fetchUser();
  }, [userId]);

  return (
    <>
      <div className="user-details-container">
        {user ? (
          <div className="user-card">
            <h1>{user.name}</h1>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Contact:</strong> {user.contact}</p>
            <button onClick={() => navigate(`/user/${userId}/projects`)}>View Projects</button>
          </div>
        ) : (
          <p className="loading-text">Loading...</p>
        )}
      </div>
    </>
  );
}

export default UserDetails;
