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

  const matchUser = usersArray.findUser('email', body.email);

  if (matchUser) {
    return res.status(409).json({
      status: 409,
      error: 'User with given email already exists',
    });
  }

  const createdUser = new User(value);
  usersArray.addUser(createdUser);

  const token = helper.generateToken(createdUser);

  res.status(201).json({
    status: 201,
    message: 'User created successfully',
    data: {
      token,
      info: createdUser.dislayUser(),
    },
  });
});

export default router;
