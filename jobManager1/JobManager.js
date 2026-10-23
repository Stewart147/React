import React, { useState } from 'react';
import { JobColumn } from './JobColumn';
import './JobManager.css';



function JobManager() {

   // set up states in empty arrays
  const [jobs, setJobs] = useState([]);
  const [activity, setActivity] = useState('');
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState('Need to Complete');

  // add job function
  const addJob = (e) => {
    e.preventDefault();
    const newJob = { activity, categories, status };
    setJobs([...jobs, newJob]);
    // Reset form fields
    setActivity('');
    setCategories([]);
    setStatus('Need to Complete');
  };


  return (

    <div className="job-manager">

      <form onSubmit={addJob}>
        {/* Implement form inputs here */}

        <input
          type="text"
          placeholder="Enter activity"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Enter categories (comma separated)"
          value={categories.join(', ')}
          onChange={(e) =>
          setCategories(
          e.target.value.split(',').map((cat) => cat.trim())
       )
       }
      />

       <select
         value={status}
         onChange={(e) => setStatus(e.target.value)}
        >
         <option value="Need to Complete">Need to Complete</option>
         <option value="In Progress">In Progress</option>
         <option value="Completed">Completed</option>
       </select>

       <button type="submit">Add Job</button>
   
      </form>

      <div className="job-columns">
        <JobColumn title="Need to Complete" status="Need to Complete" jobs={jobs} />
        <JobColumn title="In Progress" status="In Progress" jobs={jobs} />
        <JobColumn title="Completed" status="Completed" jobs={jobs} />
      </div>
    </div>

  );
}

export default JobManager;
