import { createServer } from 'http';
const PORT = process.env.PORT || 3101;
console.log(process.env.PORT);

const users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Alice Johnson' },
  { id: 4, name: 'Bob Brown' },
];

// Logger middleware
const logger = (req, res, next) => {
  console.log(`Request method: ${req.method}, Request url: ${req.url}`);
  next();
}

// JSON middleware
const jsonMiddleware = (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
}

// Route handler for GET /api/users
const getUsersHandler = (req, res) => {
  res.write(JSON.stringify(users));
  res.end();
}

// Route handler for GET /api/users/:id
const getUserByIdHandler = (req, res) => {
  const id = req.url.split('/')[3];
  const user = users.find(u => u.id === parseInt(id));
  if (user) {
    res.write(JSON.stringify(user));
  } else {
    res.statusCode = 404;
    res.write(JSON.stringify({ message: 'User not Found' }));
  }
  res.end();
}

// Not found handler
const notFoundHandler = (req, res) => {
  res.statusCode = 404;
  res.write(JSON.stringify({ message: 'Route not Found' }));
  res.end();
}

// Route handler for POST /api/users
const createUserHandler = (req, res) => {
  let body = '';
  // listen for data chunks
  req.on('data', chunk => {
    body += chunk.toString(); // convert Buffer to string
  });
  // when the request ends, parse the body and add the new user
  req.on('end', () => {
    const newUser = JSON.parse(body);
    newUser.id = users.length + 1; // simple ID assignment
    users.push(newUser);
    res.statusCode = 201; // Created
    res.write(JSON.stringify(newUser));
    res.end();
  });
}

const server = createServer((req, res) => {
  logger(req, res, () => {
    jsonMiddleware(req, res, () => {
      if (req.url === '/api/users' && req.method === 'GET') {
        getUsersHandler(req, res);
      } else if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === 'GET') {
        getUserByIdHandler(req, res);
      } else if (req.url === '/api/users' && req.method === 'POST') {
        createUserHandler(req, res);
      } else {
        notFoundHandler(req, res);
      }
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});