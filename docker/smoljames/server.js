import express from 'express';
import pool from './db.js';
const PORT = 3000;

const app = express();

app.use(express.json());

app.get('/', async (req, res) => {
  try {
    const data = await pool.query(`SELECT * FROM schools`);
    return res.status(200).send(data.rows);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

app.post('/', async (req, res) => {
  const { name, location } = req.body;
  try {
    await pool.query('INSERT INTO schools (name, address) VALUES ($1, $2)', [name, location]);
    return res.status(200).send({message: 'Successfully added child'});
  } catch (err) {
    console.log('---- this error ----', err);
    return res.sendStatus(500);
  }
});

app.get('/setup', async (req, res) => {
  try {
    await pool.query(`CREATE TABLE schools( id SERIAL PRIMARY KEY, name VARCHAR(100), address VARCHAR(100))`);
    return res.status(200).send({message: 'Successfully created table'});
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});