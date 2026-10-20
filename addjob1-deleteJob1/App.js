

import React, { useState, useEffect } from "react";
import "./App.css";
import { JobColumn } from "./components/JobColumn";

import startImg from "./images/cat1.png";
import progressImg from "./images/dog1.png";
import compImg from "./images/parrot1.png";

const App = () => {
  
  // Load jobs from localStorage or default
  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem("jobs");
    return savedJobs
      ? JSON.parse(savedJobs)
      : [
          { id: 1, title: "Parse Emails", status: "Need to Start" },
          { id: 2, title: "SAP Extraction", status: "In Progress" },
          { id: 3, title: "General Report", status: "Completed" },
        ];
  });

  // Dropdown for adding a job
  const [selectedStatus, setSelectedStatus] = useState("Need to Start");

  // Search term
  const [searchTerm, setSearchTerm] = useState("");

  // Save jobs to localStorage on changes
  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  // Add new job with original title = status (or could extend later)
  const handleSubmit = (e) => {
    e.preventDefault();

    const newJob = {
      id: Date.now(),
      title: prompt("Enter job title:", selectedStatus) || selectedStatus,
      status: selectedStatus,
    };

    setJobs((prevJobs) => [...prevJobs, newJob]);
  };

  // Delete job
  const handleDelete = (id) => {
    setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
  };

  // Update job status (drag-and-drop)
  const updateJobStatus = (id, newStatus) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === id ? { ...job, status: newStatus } : job
      )
    );
  };

  // Filter jobs by title
  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      {/* Add Job Form */}
      <form onSubmit={handleSubmit}>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="Need to Start">Need to Start</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <button type="submit" className="addBtn">
          Add Job
        </button>
      </form>

      {/* Search */}
      <div className="searchContainer">
        <input
          type="text"
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Job Columns */}
      <div className="job-columns">
        <JobColumn
          title="Need to Start"
          jobs={filteredJobs.filter((job) => job.status === "Need to Start")}
          image={startImg}
          alt="Need to Start"
          onDelete={handleDelete}
          onUpdateStatus={updateJobStatus}
        />
        <JobColumn
          title="In Progress"
          jobs={filteredJobs.filter((job) => job.status === "In Progress")}
          image={progressImg}
          alt="In Progress"
          onDelete={handleDelete}
          onUpdateStatus={updateJobStatus}
        />
        <JobColumn
          title="Completed"
          jobs={filteredJobs.filter((job) => job.status === "Completed")}
          image={compImg}
          alt="Completed"
          onDelete={handleDelete}
          onUpdateStatus={updateJobStatus}
        />
      </div>

      {/* No Results */}
      {filteredJobs.length === 0 && searchTerm && (
        <p className="noResults">No matching jobs found.</p>
      )}
    </div>
  );
};

export default App;