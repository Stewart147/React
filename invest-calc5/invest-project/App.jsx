import React from "react";
import Header from './components/Header';
import './index.css';


function App() {
  

  return (

    <div>

      {/* pass props title and subtitle to Header.jsx */}
      <Header title="Investment Calculator" subtitle="watch your money grow ..." />

    </div>
      
      
  )

}

export default App;
