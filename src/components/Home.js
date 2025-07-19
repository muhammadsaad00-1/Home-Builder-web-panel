import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="home-container">
        <h1>Welcome to Home Builder Admin Panel</h1>
        <h2 className="home-subtitle">Manage users, projects, and more with ease</h2>
        <div className="home-options">
          <div className="home-card" onClick={() => navigate('/users')}>
            <h2>Go to Users</h2>
            <p>Manage and view all users</p>
          </div>
          <div className="home-card" onClick={() => navigate('/about')}>
            <h2>Go to About Page</h2>
            <p>Learn more about this project</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home; 