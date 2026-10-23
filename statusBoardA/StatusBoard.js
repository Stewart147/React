
import React, { useState } from 'react';
import TicketInfo from './TicketInfo';
import completedImage from './images/cat1.png';
import inProgressImage from './images/dog1.png';
import failedImage from './images/parrot1.png';

const StatusBoard = () => {

  const [counts, setCounts] = useState({
    completed: 0,
    "in-progress": 0,
    failed: 0
  });

  // increment counter function
  const handleIncrement = (status) => {
    setCounts(prev => ({
      ...prev,
      [status]: prev[status] + 1
    }));
  };
  

  // reset to zero function
  const handleReset = () => {
    setCounts({
      completed: 0,
      "in-progress": 0,
      failed: 0
    });
  };

  return (
    <div className="status-board">

      <button onClick={handleReset}>
        Reset Counts
      </button>

      <TicketInfo
        result="completed"
        count={counts.completed}
        onClick={() => handleIncrement("completed")}
      >
        <img src={completedImage} alt="Completed" width={100} height={100} />
        <p>Tickets Completed</p>
      </TicketInfo>

      <TicketInfo
        result="in-progress"
        count={counts["in-progress"]}
        onClick={() => handleIncrement("in-progress")}
      >
        <img src={inProgressImage} alt="In Progress" width={100} height={100} />
        <p>Tickets In Progress</p>
      </TicketInfo>

      <TicketInfo
        result="failed"
        count={counts.failed}
        onClick={() => handleIncrement("failed")}
      >
        <img src={failedImage} alt="Failed" width={100} height={100} />
        <p>Tickets Failed</p>
      </TicketInfo>

    </div>
  );
};

export default StatusBoard;
