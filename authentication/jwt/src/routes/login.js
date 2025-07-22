import jwt from 'jsonwebtoken';

const getUser = async (username) => {
  return {userId: 123, password: '123456', username};
}

export default async (req, res) => {
  const { username, password } = req.body;

  const user = await getUser(username);

  if (user.password !== password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  delete user.password; // Remove password from user object

  // The important part is to sign the JWT with a secret key
  const token = jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: '1h' // Token expiration time
  });

  res.cookie('token', token, {
    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
    // secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    // sameSite: 'Strict' // Helps prevent CSRF attacks
  });

  return res.redirect('/welcome'); // Redirect to welcome page after login
}
