import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  
import './AddTopic.css';

interface TopicData {
  topic: string;
  facts: string[];
  sources: string;
  category?: string;
}

const AddTopic = () => {
  const [topicData, setTopicData] = useState<TopicData>({
    topic: '',
    facts: [''],
    sources: '',
    category: 'history',
  });

  const navigate = useNavigate(); // Correctly placed within the component

  const handleFactChange = (index: number, value: string) => {
    const newFacts = [...topicData.facts];
    newFacts[index] = value;
    setTopicData({ ...topicData, facts: newFacts });
  };

  const addFactField = () => {
    setTopicData({ ...topicData, facts: [...topicData.facts, ''] });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTopicData({ ...topicData, category: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch('http://localhost:3001/save-topic', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(topicData),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log('Success:', data);
        setTopicData({
          topic: '',
          facts: [''],
          sources: '',
          category: 'history',
        });
        navigate('/topics-list'); 
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="add-topic">
      <h1>Add Topic</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="topic">Topic</label>
        <input
          name="topic"
          className="input"
          placeholder="Enter topic"
          onChange={(e) =>
            setTopicData({ ...topicData, topic: e.target.value })
          }
          value={topicData.topic}
        />

        <label htmlFor="facts">Facts</label>
        {topicData.facts.map((fact, index) => (
          <div key={index}>
            <input
              name="facts"
              className="input"
              placeholder="Enter fact"
              onChange={(e) => handleFactChange(index, e.target.value)}
              value={fact}
            />
          </div>
        ))}
        <div className="button-div">
          <button type="button" onClick={addFactField}>
            Add Fact
          </button>
        </div>

        <label htmlFor="sources">Sources</label>
        <input
          name="sources"
          className="input"
          placeholder="Enter sources"
          onChange={(e) =>
            setTopicData({ ...topicData, sources: e.target.value })
          }
          value={topicData.sources}
        />

        <label htmlFor="category">Category</label>
        <select
          name="category"
          className="input"
          onChange={handleCategoryChange}
          value={topicData.category}
        >
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

        <div className="button-div">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddTopic;
