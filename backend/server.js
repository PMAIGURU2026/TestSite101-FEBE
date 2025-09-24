const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Sample word data (to be replaced with full Barron's list)
const words = [
  {
    word: 'abate',
    definition: 'to lessen in intensity or degree',
    level: 'novice',
    subject: 'general',
    pronunciation: '/audio/abate.mp3',
  },
  {
    word: 'zealot',
    definition: 'someone passionately devoted to a cause',
    level: 'expert',
    subject: 'general',
    pronunciation: '/audio/zealot.mp3',
  },
  // ...add more words
];

// Get words by level and subject
app.get('/api/words', (req, res) => {
  const { level, subject } = req.query;
  let filtered = words;
  if (level) filtered = filtered.filter(w => w.level === level);
  if (subject) filtered = filtered.filter(w => w.subject === subject);
  res.json(filtered);
});

// Get definition and pronunciation for a word
app.get('/api/word/:word', (req, res) => {
  const wordObj = words.find(w => w.word === req.params.word);
  if (!wordObj) return res.status(404).json({ error: 'Word not found' });
  res.json(wordObj);
});

// Track user progress (simple in-memory for now)
let userProgress = {};
app.post('/api/progress', (req, res) => {
  const { userId, level, completed } = req.body;
  userProgress[userId] = { level, completed };
  res.json({ success: true });
});

app.get('/api/progress/:userId', (req, res) => {
  res.json(userProgress[req.params.userId] || {});
});

app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
       origin: 'http://:lighthearted-pony-5892d5.netlify.app'
