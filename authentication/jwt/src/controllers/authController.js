import jwt from 'jsonwebtoken';
import { addRefreshToken } from '../services/tokenService.js';

export const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' });
};

export const auth = (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: "Username is required" });

  const user = { name: username };
  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);

  addRefreshToken(refreshToken);
  return res.json({ accessToken, refreshToken });
};