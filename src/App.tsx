
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AddTopic from './components/AddTopic';
import TopicsList from './components/TopicsList';
import TopicDetails from './components/TopicDetails';
import EditTopic from './components/EditTopic';

const App: React.FC = () => {  
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-topic" element={<AddTopic />} />
        <Route path="/topics-list" element={<TopicsList />} />
        <Route path="/topics/:topicId" element={<TopicDetails />} />{' '}
        <Route path="/edit-topic/:topicId" element={<EditTopic />} />
      </Routes>
    </Router>
  );
}

export default App;
