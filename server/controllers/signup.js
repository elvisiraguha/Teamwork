import express from 'express';
import usersArray from '../models/usersArray';
import helper from '../helpers/helper';
import User from '../helpers/User';

const router = express.Router();

router.post('/', (req, res) => {
  const { body } = req;
  const { value, error } = helper.joiSignupSchema(body);

  if (error) {
    const errorMessage = error.details[0].message;
    return res.status(400).json({
      status: 400,
      error: errorMessage,
    });
  }

  const matchUser = usersArray.findUser(body.email);

  if (matchUser) {
    return res.status(401).json({
      status: 401,
      error: 'User with given email already exists',
    });
  }

  const createdUser = new User(value);
  usersArray.addUser(createdUser);

  const token = ((email) => {
    createdUser.setToken(email);
    return createdUser.getToken();
  })(createdUser.email);

  res.status(201).json({
    status: 201,
    message: 'User created successfully',
    data: {
      token,
    },
  });
});

export default router;
