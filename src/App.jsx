import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import JobApplicationForm from "./JobApplicationForm";
import Dashboard from "./Dashboard";
import ViewJobApplication from "./ViewJobApplication";
import ApplicationStatusChart from "./ApplicationStatusChart";

function App() {
  const [filters, setFilters] = useState({
    company: "",
    jobTitle: "",
    status: "",
    salary: "",
    interview: false,
    rejection: false,
    ghosting: false,
    coverLetterProvided: "",
    jobSource: "",
  });
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    // Fetch data with filters
    const queryParams = new URLSearchParams(filters);
    fetch(`http://127.0.0.1:5555/applications?${queryParams}`)
      .then((response) => response.json())
      .then((data) => {
        setApplications(data);
      })
      .catch((error) => console.error("Error:", error));
  }, [filters]);

  return (
    <Router>
      <Navbar /> {/* Render the navbar */}
      <Routes>
        <Route path="/apply" element={<JobApplicationForm />} />
        <Route
          path="/"
          element={
            <Dashboard
              applications={applications}
              setApplications={setApplications}
              setFilters={setFilters}
              filters={filters}
            />
          }
        />
        <Route path="/applications/:id" element={<ViewJobApplication />} />
      </Routes>
      <ApplicationStatusChart applications={applications} />
    </Router>
  );
}

export default App;
