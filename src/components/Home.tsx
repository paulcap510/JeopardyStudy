import React from 'react';
import './Home.css';  
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Customized Jeopardy Study</h1>
      <div className="buttons-div">
        <button>
          <Link to="/topics-list">Study</Link>
          </button>
        <button>
          <Link to="/add-topic">Add Topic</Link>
        </button>
      </div>
    </div>
  );
};

export default Home;
