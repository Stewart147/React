import React from 'react';

// TicketInfo component

//const TicketInfo = ({ result, image, children }) => {

const TicketInfo = ({ result, count, image, children, onClick }) => {


  // increment count onClick()
  const handleIncrement = () => {
      onClick();
  }
    

  return (

    // <div className={`ticket-info ${result}`}>
    <div className={result}> 
     {/* Implement the ticket info display here */}
      {image}
      {children}
    
     {/* Separate Increment Button */}
      <button onClick={handleIncrement}>
        + Add Ticket
      </button>

        <div className="ticket-details">
          <p>Status: {result}</p>
          <p>Total tickets: {count}</p>
        </div>
    

    </div>


 );

};

export default TicketInfo;
