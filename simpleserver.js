const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;
const { v4: uuidv4 } = require('uuid');

app.use(cors());
app.use(bodyParser.json());

app.post('/save-topic', (req, res) => {
  const newData = req.body;
  const filePath = 'topics.json';
  newData.id = uuidv4();

  fs.readFile(filePath, (err, data) => {
    let existingData = [];

    if (err) {
      if (err.code === 'ENOENT') {
        existingData = [];
      } else {
        res.status(500).send('Error reading data');
        return;
      }
    } else {
      try {
        existingData = JSON.parse(data);
        if (!Array.isArray(existingData)) {
          throw new Error('Data is not an array');
        }
      } catch (parseErr) {
        res.status(500).send('Error parsing data');
        return;
      }
    }

    existingData.push(newData);

    fs.writeFile(
      filePath,
      JSON.stringify(existingData, null, 2),
      (writeErr) => {
        if (writeErr) {
          res.status(500).send('Error saving data');
          return;
        }
        res.send('Data saved successfully');
      }
    );
  });
});

app.get('/get-topics', (req, res) => {
  const filePath = 'topics.json';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.json([]);
      } else {
        res.status(500).send('Error reading data');
      }
    } else {
      try {
        const existingData = JSON.parse(data);
        res.json(existingData);
      } catch (parseErr) {
        res.status(500).send('Error parsing data');
      }
    }
  });
});

app.get('/get-topic/:topicId', (req, res) => {
  const topicId = req.params.topicId;
  const filePath = 'topics.json';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.status(500).send('Error reading data');
      return;
    }

    try {
      const existingData = JSON.parse(data);
      console.log(
        "Existing topics' IDs:",
        existingData.map((t) => t.id)
      );
      const topic = existingData.find((topic) => topic.id === topicId);

      if (topic) {
        res.json(topic);
      } else {
        res.status(404).send('Topic not found');
      }
    } catch (parseErr) {
      res.status(500).send('Error parsing data');
    }
  });
});

// ...

app.put('/update-topic/:topicId', (req, res) => {
  const updatedData = req.body;
  const topicId = req.params.topicId; 

  const filePath = 'topics.json';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.status(500).send('Error reading data');
      return;
    }

    let existingData;
    try {
      existingData = JSON.parse(data);
    } catch (parseErr) {
      res.status(500).send('Error parsing data');
      return;
    }

    const topicIndex = existingData.findIndex((topic) => topic.id === topicId);
    if (topicIndex === -1) {
      res.status(404).send('Topic not found');
      return;
    }

    existingData[topicIndex] = { ...updatedData, id: topicId }; // Update the topic with the new data while keeping the same id

    fs.writeFile(filePath, JSON.stringify(existingData, null, 2), (writeErr) => {
      if (writeErr) {
        res.status(500).send('Error saving data');
        return;
      }
      res.send('Topic updated successfully');
    });
  });
});

// TEST 



app.delete('/delete-topic/:topicId', (req, res) => {
  const topicId = req.params.topicId;
  const filePath = 'topics.json';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.status(500).send('Error reading data');
      return;
    }

    let existingData;
    try {
      existingData = JSON.parse(data);
    } catch (parseErr) {
      res.status(500).send('Error parsing data');
      return;
    }

    // Find the index of the topic to be deleted
    const topicIndex = existingData.findIndex((topic) => topic.id === topicId);

    if (topicIndex === -1) {
      res.status(404).send('Topic not found');
      return;
    }

    // Remove the topic from the array
    existingData.splice(topicIndex, 1);

    fs.writeFile(
      filePath,
      JSON.stringify(existingData, null, 2),
      (writeErr) => {
        if (writeErr) {
          res.status(500).send('Error saving data');
          return;
        }
        res.send('Topic deleted successfully');
      }
    );
  });
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
