import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import JobApplicationForm from "./JobApplicationForm";
import Dashboard from "./Dashboard";
import ViewJobApplication from "./ViewJobApplication";

function App() {
  return (
    <Router>
      <Navbar /> {/* Render the navbar */}
      <Routes>
        <Route path="/apply" element={<JobApplicationForm />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/applications/:id" element={<ViewJobApplication />} />
      </Routes>
    </Router>
  );
}

export default App;
