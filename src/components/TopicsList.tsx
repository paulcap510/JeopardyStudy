import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './TopicsList.css';

interface Topic {
  id: string; 
  topic: string;
  facts: string[];
  sources: string;
  category: string, 
}

interface SortProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}



const SortComponent: React.FC<SortProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <select
      value={selectedCategory}
      onChange={(e) => onCategoryChange(e.target.value)}
    >
      <option value="">All Categories</option>      
      <option value="history">World History</option>
      <option value="science">Science</option>
      <option value="ancient-history">Ancient History</option>
      <option value="literature">Literature</option>
      <option value="arts">Arts</option>
      <option value="geography">Geography</option>
      <option value="mathematics">Mathematics</option>
      <option value="technology">Technology</option>
      <option value="philosophy">Philosophy</option>
      <option value="sports">Sports</option>
      <option value="music">Music</option>
      <option value="pop-culture">Pop Culture</option>
      <option value="politics">Politics</option>
      <option value="economics">Economics</option>
      <option value="biology">Biology</option>
      <option value="physics">Physics</option>
      <option value="chemistry">Chemistry</option>
    </select>
  );
};

const TopicsList = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');


  useEffect(() => {
    fetch('http://localhost:3001/get-topics')
      .then((response) => response.json())
      .then((data) => setTopics(data))
      .catch((error) => console.error('Error:', error));
  }, []);

    const handleCategoryChange = (category: string) => {
      setSelectedCategory(category);
    };

    const filteredTopics = selectedCategory
      ? topics.filter((topic) => topic.category === selectedCategory)
      : topics;

    return (
    <div className="topics-container">
      <h1>Topics</h1>
      <SortComponent
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <div className="topics-grid">
        {filteredTopics.map((topic) => (
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
