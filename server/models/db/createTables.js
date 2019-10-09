import connect from './connectToDB';
import helper from '../../helpers/helper';

const users = () => {
  const queryString = `DROP TABLE IF EXISTS users;
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
    department VARCHAR(128) NOT NULL,
    isAdmin BOOLEAN
  )`;

  connect.execute(queryString);
};

const articles = () => {
  const queryString = `DROP TABLE IF EXISTS articles;
  CREATE TABLE IF NOT EXISTS articles
  (
    id SERIAL PRIMARY KEY,
    title VARCHAR(128) NOT NULL,
    article VARCHAR(1048) NOT NULL,
    createdOn DATE NOT NULL,
    authorid INT,
    categories VARCHAR [] NOT NULL
    )`;

  connect.execute(queryString);
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

  const createdUser = await connect.insertUser(user);
  console.log(createdUser);
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
  const createdArticle = await connect.insertArticles(article);
  console.log(createdArticle);
};

users();
insertUser();
articles();
insertArticle();
