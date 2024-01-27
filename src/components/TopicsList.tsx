import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './TopicsList.css';

interface Topic {
  id: string; 
  topic: string;
  facts: string[];
  sources: string;
}

const TopicsList = () => {
  const [topics, setTopics] = useState<Topic[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/get-topics')
      .then((response) => response.json())
      .then((data) => setTopics(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <div className="topics-container">
      <h1>Topics</h1>
      <div className="topics-grid">
        {topics.map((topic) => (
          <Link
            key={topic.id}
            to={`/topics/${topic.id}`}
            className="topic-button"
          >
            {topic.topic}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopicsList;
