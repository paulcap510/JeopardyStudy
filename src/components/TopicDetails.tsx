import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import './TopicDetails.css';

interface Topic {
  id: string;
  topic: string;
  facts: string[];
  sources: string;
  category: string;
}

const categoryDisplayNames: { [key: string]: string } = {
  history: 'World History',
  science: 'Science',
  'ancient-history': 'Ancient History',
  literature: 'Literature',
  arts: 'Arts',
  geography: 'Geography',
  mathematics: 'Mathematics',
  technology: 'Technology',
  philosophy: 'Philosophy',
  sports: 'Sports',
  music: 'Music',
  'pop-culture': 'Pop Culture',
  politics: 'Politics',
  economics: 'Economics',
  biology: 'Biology',
  physics: 'Physics',
  chemistry: 'Chemistry',
  // ... add other categories here
};

const TopicDetails = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const [topic, setTopic] = useState<Topic | null>(null);

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
      <h1>{topic.topic}</h1>
      <h2>Facts:</h2>
      <ul>
        {topic.facts.map((fact, index) => (
          <li key={index}>{fact}</li>
        ))}
      </ul>

      <h2>Sources:</h2>
      <ul>
        {topic.sources ? (
          topic.sources
            .split(',')
            .map((source, index) => <li key={index}>{source.trim()}</li>)
        ) : (
          <li>No sources added</li>
        )}
      </ul>

      <div className="category">
        <h2>Category</h2>
        <p>{categoryDisplayNames[topic.category] || topic.category}</p>
      </div>

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
