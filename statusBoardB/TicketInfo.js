
import React, { useState, useEffect } from 'react';

const TicketInfo = ({ result, count, children, onClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [animate, setAnimate] = useState(false);

  const toggleDetails = () => {
    setIsOpen(prev => !prev);
  };

  const handleIncrement = (e) => {
    e.stopPropagation();  // prevents toggle
    onClick();
  };

  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => {
      setAnimate(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [count]);

  return (
    <div className={`ticket-info ${result} ${animate ? "pulse" : ""}`}>

      {/* Header Click = Toggle */}
      <div onClick={toggleDetails} style={{ cursor: "pointer" }}>
        {children}
        <h2>{count}</h2>
      </div>

      {/* Separate Increment Button */}
      <button onClick={handleIncrement}>
        + Add Ticket
      </button>

      {isOpen && (
        <div className="ticket-details">
          <p>Status: {result}</p>
          <p>Total tickets: {count}</p>
        </div>
      )}

    </div>
  );
};

export default TicketInfo;
