import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./components/UserList";
import UserDetails from "./components/UserDetails";
import ProjectList from "./components/ProjectList";
import ProjectDetails from "./components/ProjectDetails";
import Home from "./components/Home";
import Navbar from "./components/NavBar";
// Placeholder About component (to be created)
const About = () => <div style={{padding: '40px', textAlign: 'center'}}><h2>About Page</h2><p>This is the Home Builder Admin Panel.</p></div>;

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/about" element={<About />} />
        <Route path="/user/:userId" element={<UserDetails />} />
        <Route path="/user/:userId/projects" element={<ProjectList />} />
        <Route path="/user/:userId/project/:projectId" element={<ProjectDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
