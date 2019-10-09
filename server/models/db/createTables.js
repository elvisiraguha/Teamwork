import connect from './connectToDB';
import helper from '../../helpers/helper';

const users = async () => {
  const queryString = `DROP TABLE IF EXISTS users;
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
  )`;
  try {
    await connect.execute(queryString);
  } catch (error) {
    console.log(error.message);
  }
};

const articles = async () => {
  const queryString = `DROP TABLE IF EXISTS articles;
  CREATE TABLE articles
  (
    id SERIAL PRIMARY KEY,
    title VARCHAR(128) NOT NULL,
    article VARCHAR(1048) NOT NULL,
    createdOn DATE NOT NULL,
    authorid INT,
    categories VARCHAR [] NOT NULL
    )`;

  try {
    connect.execute(queryString);
  } catch (error) {
    console.log(error.message);
  }
};

const insertUser = async () => {
  const user = [
    'Olivier',
    'Nshimiye',
    'olivier@student.edu',
    helper.hashPassword('olivier'),
    'male',
    'student',
    'Kigali',
    'computer science',
    false,
  ];
  try {
    await connect.insertUser(user);
  } catch (error) {
    console.log(error.message);
  }
};

const insertArticle = async () => {
  const article = [
    'Importance of technology',
    `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae ullam nostrum quo, quaerat illum,
    aspernatur nihil, soluta id saepe eum dicta sit nulla rem cumque quas repellat velit consequuntur
    expedita!`,
    new Date(),
    1,
    ['technology', 'science'],
  ];
  try {
    await connect.insertArticles(article);
  } catch (error) {
    console.log(error.message);
  }
};

users();
insertUser();
articles();
insertArticle();
