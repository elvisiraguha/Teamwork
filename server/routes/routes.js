import express from 'express';
import usersArray from '../models/usersArray';
import helper from '../helpers/helper';
import User from '../helpers/User';

const router = express.Router();

// eslint-disable-next-line consistent-return
router.post('/', (req, res) => {
  const { value, error } = helper.joiSchema(req.body);
  if (error) {
    const errorMessage = error.details[0].message;
    return res.status(400).json({
      status: 400,
      message: errorMessage,
    });
  }

  const matchUser = helper.findUser(req.body.email);

  if (matchUser) {
    return res.status(401).json({
      status: 401,
      error: 'User with given email already exists',
    });
  }

  const createdUser = new User(value);
  usersArray.push(createdUser);

  res.status(201).json({
    status: 201,
    message: 'User created successfully',
    data: {
      token: createdUser.token,
    },
  });
});

export default router;
