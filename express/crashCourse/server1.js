import express from 'express';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3101;
const __dirname = new URL('.', import.meta.url).pathname;

// setup static folder
// app.use(express.static(path.join(__dirname, 'public')));

let posts = [
  { id: 1, title: 'Post One', content: 'This is the first post.' },
  { id: 2, title: 'Post Two', content: 'This is the second post.' },
  { id: 3, title: 'Post Three ', content: 'This is the third post.' },
  { id: 4, title: 'Post Four', content: 'This is the fourth post.' },
];

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

// Get all posts
app.get('/api/posts', (req, res) => {
  const limit = parseInt(req.query.limit) || posts.length;
  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(posts.slice(0, limit));
  }
  return res.status(200).json(posts);
});

// Get post by ID
app.get('/api/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find(p => p.id === id);
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  return res.status(200).json(post);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
