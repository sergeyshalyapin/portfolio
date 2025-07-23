import express from "express";
import jwt from "jsonwebtoken";
import authRoutes from "./src/routes/auth.js";
import { generateAccessToken } from "./src/controllers/authController.js";
import { isRefreshTokenValid, getRefreshTokens } from "./src/services/tokenService.js";

const PORT = 3102;
const app = express();

app.use(express.json());

app.post("/token", (req, res) => {
  const refreshToken = req.body.token;
  if (!refreshToken) return res.sendStatus(401);

  console.log("Refresh Tokens:", getRefreshTokens());

  if (!isRefreshTokenValid(refreshToken)) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ name: user.name });
    res.json({ accessToken });
  });
});

app.use('/login', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});