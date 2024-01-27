import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import './EditTopic.css'; 

interface TopicData {
  id: string;

  topic: string;
  facts: string[];  
  sources: string;
  category?: string,
}

const EditTopic = () => {

  const [topicData, setTopicData] = useState<TopicData>({
    id: '',
    topic: '',
    facts: [''],
    sources: '',
    category: '',
  });
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();

useEffect(() => {
  fetch(`http://localhost:3001/get-topic/${topicId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Topic not found');
      }
      return response.json();
    })
    .then(data => setTopicData(data))
    .catch(error => console.error('Error:', error));
}, [topicId]);


    const handleFactChange = (index: number, value: string) => {
      const newFacts = [...topicData.facts];
      newFacts[index] = value;
      setTopicData({...topicData, facts: newFacts})
    }

      const addFactField = () => {
        setTopicData({ ...topicData, facts: [...topicData.facts, ''] });
      };

      const handleDelete = (index: number) => {
        const newFacts = topicData.facts.filter((_, i) => i !== index); 
        setTopicData({ ...topicData, facts: newFacts}) 
      }


      const handleCategoryChange = (
        e: React.ChangeEvent<HTMLSelectElement>
      ) => {
        setTopicData({ ...topicData, category: e.target.value });
      };



    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Updating topic with ID:', topicId, 'Data:', topicData);
      fetch(`http://localhost:3001/update-topic/${topicId}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(topicData),
      })
        .then((response) => response.text())
        .then(() => navigate('/topics-list')) 
        .catch((error) => console.error('Error:', error));
    };

const handleDeleteTopic = () => {
  if (window.confirm('Are you sure you want to delete this topic?')) {
    fetch(`http://localhost:3001/delete-topic/${topicId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete topic');
        }
        return response.text();
      })
      .then(() => {
        alert('Topic deleted successfully');
        navigate('/topics-list');
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Error deleting topic');
      });
  }
};




return (
  <div className="edit-topic">
    <h1>Edit Topic</h1>
    <form onSubmit={handleSubmit}>
      <label htmlFor="topic">Topic</label>
      <input
        name="topic"
        className="input"
        placeholder="Enter topic"
        onChange={(e) => setTopicData({ ...topicData, topic: e.target.value })}
        value={topicData.topic}
      />

      <label htmlFor="facts">Facts</label>
      {topicData.facts.map((fact, index) => (
        <div key={index} className="fact-input-container">
          <input
            name="facts"
            className="input"
            placeholder="Enter fact"
            onChange={(e) => handleFactChange(index, e.target.value)}
            value={fact}
          />
          <button type="button" onClick={() => handleDelete(index)}>
            Delete
          </button>
        </div>
      ))}
      <div className="button-group">
        <button type="button" onClick={addFactField}>
          Add Fact
        </button>
      </div>

      <label htmlFor="sources">Sources</label>
      <input
        name="sources"
        className="input"
        placeholder="Enter sources"
        onChange={(e) => setTopicData({ ...topicData, sources: e.target.value })}
        value={topicData.sources}
      />

      <label htmlFor="category">Category</label>
      <select
        name="category"
        className="input"
        onChange={(e) => setTopicData({ ...topicData, category: e.target.value })}
        value={topicData.category || ''}
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
        {/* Add more category options as needed */}
      </select>

      <div className="button-group">
        <button type="submit">Submit</button>
      </div>
      
      <div className="button-group">
                 <button type="button" onClick={handleDeleteTopic} className="delete-button">
    Delete Topic</button>
      </div>
    </form>






  </div>
);
      };

export default EditTopic