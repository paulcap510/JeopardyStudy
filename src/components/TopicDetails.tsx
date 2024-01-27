import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import './TopicDetails.css';

interface Topic {
  id: string;
  topic: string;
  facts: string[]; 
  sources: string;
}

const TopicDetails = () => {
  const { topicId } = useParams<{ topicId: string }>(); //?
  const [topic, setTopic] = useState<Topic | null>(null); // ?

  // ? how do we treat things since there is no ID ?
  useEffect(() => {
    fetch(`http://localhost:3001/get-topic/${topicId}`)
      .then((response) => response.json())
      .then((data) => setTopic(data))
      .catch((error) => console.error('Error:', error));
  }, [topicId]);

  if (!topic) {
    return <div>Loading...</div>;
  }

  return (
    <div className="topic-details-container">
      <h1>{topic?.topic}</h1>
      <h2>Facts:</h2>
      <ul>
        {topic?.facts.map((fact, index) => (
          <li key={index}>{fact}</li>
        ))}
      </ul>
      <h2>Sources:</h2>
      <p>{topic?.sources}</p>

          <div className="button-div">
      <button>
        <Link to={`/edit-topic/${topic.id}`} className="nav-link">
          Edit
        </Link>
      </button>
          </div>
    </div>

  );
};

export default TopicDetails;
