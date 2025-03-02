import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./components/UserList";
import UserDetails from "./components/UserDetails";
import ProjectList from "./components/ProjectList";
import ProjectDetails from "./components/ProjectDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/user/:userId" element={<UserDetails />} />
        <Route path="/user/:userId/projects" element={<ProjectList />} />
        <Route path="/user/:userId/project/:projectId" element={<ProjectDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
