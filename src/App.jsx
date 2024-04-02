import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import JobApplicationForm from "./JobApplicationForm";
import Dashboard from "./Dashboard";

function App() {
  return (
    <Router>
      <Navbar /> {/* Render the navbar */}
      <Routes>
        <Route path="/apply" element={<JobApplicationForm />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
