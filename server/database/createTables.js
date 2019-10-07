import { Pool } from 'pg';
import { config } from 'dotenv';

config();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const users = () => {
  const queryString = `
  CREATE TABLE IF NOT EXISTS users
  (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(128) NOT NULL,
    lastName VARCHAR(128) NOT NULL,
    email VARCHAR(128) NOT NULL,
    password VARCHAR(128) NOT NULL,
    gender VARCHAR(128) NOT NULL,
    jobRole VARCHAR(128) NOT NULL,
    address VARCHAR(128) NOT NULL,
    department VARCHAR(128) NOT NULL
  )`;

  pool.query(queryString)
    .then((result) => console.log(result))
    .catch((error) => console.log(error))
    .finally(() => pool.end());
};

users();
