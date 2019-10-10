import { Pool } from 'pg';
import { config } from 'dotenv';

config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const createTables = pool.query(
  `
  DROP TABLE IF EXISTS users;
  CREATE TABLE users
  (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(128) NOT NULL,
    lastName VARCHAR(128) NOT NULL,
    email VARCHAR(128) NOT NULL,
    password VARCHAR(128) NOT NULL,
    gender VARCHAR(128) NOT NULL,
    jobRole VARCHAR(128) NOT NULL,
    address VARCHAR(128) NOT NULL,
    department VARCHAR(128) NOT NULL,
    isAdmin BOOLEAN
  );
  INSERT INTO users 
    (firstname, lastname, email, password, gender, jobrole, address, department, isadmin)
  VALUES(
    'Olivier',
    'Nshimiye',
    'olivier@student.edu',
    '$2b$08$LiYm0VR0borDqRquJrDMt.3E1wiSPwDxvZcGF9I.JpuCkkPZ7yVSS',
    'male',
    'student',
    'Kigali',
    'computer science',
    false
  ) RETURNING *;

  DROP TABLE IF EXISTS articles;
  CREATE TABLE articles
  (
    id SERIAL PRIMARY KEY,
    title VARCHAR(128) NOT NULL,
    article VARCHAR(1048) NOT NULL,
    createdOn VARCHAR(128) NOT NULL,
    authorid INT
  );
  INSERT INTO articles
  (title, article, createdon, authorid)
  VALUES(
    'Importance of technology',
    'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae ullam nostrum quo, quaerat illum',
    '2019-10-10T10:46:34.352+02:00',
    1
  ) RETURNING *;

  DROP TABLE IF EXISTS comments;
  CREATE TABLE comments
  (
    id SERIAL PRIMARY KEY,
    comment VARCHAR(128) NOT NULL,
    article VARCHAR(1048) NOT NULL,
    articleid INT,
    createdOn VARCHAR(128) NOT NULL,
    authorid INT
  );
  INSERT INTO comments
  (comment, article, articleid, createdon, authorid)
  VALUES(
    'this is a comment',
    'Lorem etur Beatae ullam nostrum quo, quaerat illum, aspernatur nihil, soluta id saepe eum dicta sit nulla rem cumque quas repellat velit consequuntur expedita!',
    1,
    '2019-10-10T10:46:34.346+02:00',
    2
  ) RETURNING *;`,
);

export default createTables;
