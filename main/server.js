// server.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let issues = [];

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Issues API');
});

// Create
app.post('/api/issues', (req, res) => {
  const newIssue = req.body;
  issues.push(newIssue);
  console.log('Created Issue:', newIssue);
  res.json(newIssue);
});

// Read
app.get('/api/issues', (req, res) => {
  // Send different issue objects based on the request
  const randomIndex = Math.floor(Math.random() * issues.length);
  const randomIssue = issues[randomIndex] || {}; // If issues array is empty, send an empty object
  console.log('Read Issues:', randomIssue);
  res.json(randomIssue);
});

// Update
app.put('/api/issues/:id', (req, res) => {
  const issueId = req.params.id;
  const updatedIssue = req.body;

  console.log(`Updated Issue ${issueId}:`, updatedIssue);

  res.json(updatedIssue);
});

// Delete
app.delete('/api/issues/:id', (req, res) => {
  const issueId = req.params.id;
  console.log('Deleted Issue:', issueId);

  res.json({ success: true });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
