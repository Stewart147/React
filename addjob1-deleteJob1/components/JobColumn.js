

import React, { useState } from "react";
import "./JobColumn.css";

export const JobColumn = ({ title, image, alt, jobs, onDelete, onUpdateStatus }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragStart = (e, jobId) => {
    e.dataTransfer.setData("jobId", jobId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    const jobId = e.dataTransfer.getData("jobId");
    onUpdateStatus(Number(jobId), title);
    setIsDragOver(false);
  };

  return (
    <div
      className={`job-column ${isDragOver ? "drag-over" : ""}`}
      onDragOver={handleDragOver}
      onDragEnter={() => setIsDragOver(true)}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={handleDrop}
    >
      <h2>
        {title}
        <img src={image} alt={alt} className="status-image" />
      </h2>

      <ul>
        {jobs.map((job) => (
          <li
            key={job.id}
            className="job-item"
            draggable
            onDragStart={(e) => handleDragStart(e, job.id)}
          >
            <span>{job.title}</span>
            <button onClick={() => onDelete(job.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};