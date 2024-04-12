import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import JobApplicationForm from "./JobApplicationForm";
import Dashboard from "./Dashboard";
import ViewJobApplication from "./ViewJobApplication";
import { useLocation } from "react-router-dom";
import SankeyDiagram from "./SankeyDiagram";

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
  const [sankeyData, setSankeyData] = useState({
    labels: [],
    colors: [],
    sources: [],
    targets: [],
    values: [],
  });
  const [sankeyOptions, setSankeyOptions] = useState({
    source: "job_source",
    target: "current_stage",
  });
  

  useEffect(() => {
    // Fetch data with filters
    const queryParams = new URLSearchParams(filters);
    fetch(`http://127.0.0.1:5555/applications?${queryParams}`)
      .then((response) => response.json())
      .then((data) => {
        setApplications(data);

        // Prepare data for Sankey diagram based on selected options
        const labels = [];
        const sources = [];
        const targets = [];
        const values = [];
        const colors = [];

        data.forEach((application, i) => {
          // Add source to labels (if not already added)
          let sourceIndex = labels.indexOf(application[sankeyOptions.source]);
          if (sourceIndex === -1) {
            sourceIndex = labels.length;
            labels.push(application[sankeyOptions.source]);
            colors.push("blue");
          }

          // Add target to labels (if not already added)
          let targetIndex = labels.indexOf(application[sankeyOptions.target]);
          if (targetIndex === -1) {
            targetIndex = labels.length;
            labels.push(application[sankeyOptions.target]);
            colors.push("red");
          }

          // Add link from source to target
          sources.push(sourceIndex);
          targets.push(targetIndex);
          values.push(1);
        });

        setSankeyData({
          labels,
          colors,
          sources,
          targets,
          values,
        });
      })
      .catch((error) => console.error("Error:", error));
  }, [filters, sankeyOptions]);

  const handleSankeyOptionChange = (event) => {
    setSankeyOptions({
      ...sankeyOptions,
      [event.target.name]: event.target.value,
    });
  };

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
      <form>
        <label>
          Source:
          <select
            name="source"
            value={sankeyOptions.source}
            onChange={handleSankeyOptionChange}
            className="bg-gray-800 text-white border-blue-700"
          >
            <option value="job_source">Job Source</option>
            <option value="company">Company</option>
            <option value="job_title">Job Title</option>
            <option value="status">Status</option>
            <option value="cover_letter_provided">Cover Letter Provided</option>
            <option value="num_interviews">Number of Interviews</option>
            {/* Add other options as needed */}
          </select>
        </label>
        <label>
          Target:
          <select
            name="target"
            value={sankeyOptions.target}
            onChange={handleSankeyOptionChange}
            className="bg-gray-800 text-white border-blue-700"
          >
            <option value="current_stage">Current Stage</option>
            <option value="job_title">Job Title</option>
            <option value="status">Status</option>
            <option value="cover_letter_provided">Cover Letter Provided</option>
            <option value="num_interviews">Number of Interviews</option>
            {/* Add other options as needed */}
          </select>
        </label>
      </form>
      <SankeyDiagram data={sankeyData} />
    </Router>
  );
}

export default App;
