import { Pool } from 'pg';
const pool = new Pool({
  host: 'db',
  post: 5432,
  user: 'user123',
  password: 'password123',
  database: 'db123',
})

export default pool;
