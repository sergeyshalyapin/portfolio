import express from "express";
import jwt from "jsonwebtoken";

const PORT = 3101;
const app = express();

app.use(express.json());

const posts = [
  { username: "test1", title: "Post One", content: "This is the content of post one." },
  { username: "test2", title: "Post Two", content: "This is the content of post two." },
];

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/posts", authenticateToken, (req, res) => {
  res.json(posts.filter(post => post.username === req.user.name));
});

app.post("/login", (req, res) => {
  const { username } = req.body;

  const user = {
    name: username,
  }

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.json({ accessToken });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});