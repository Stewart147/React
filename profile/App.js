import './App';
import './App.css';

function App() {
  return (
    <div> 
      <h1>Profile List</h1>
       <Profiles />
    </div>
  );
}

function Profiles() {
  return (
    <div className='card'>
     <h1>Profiles</h1>
     <img src ="profiles/cat1.png" alt="cat" />
     <h1>Cat</h1>
     <p>I am a cat and I like to hunt birds and mice</p>
    </div>
  );
}

export default App;
