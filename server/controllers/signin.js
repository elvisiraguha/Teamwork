import express from 'express';
import helper from '../helpers/helper';
import usersArray from '../models/usersArray';

const router = express.Router();

// eslint-disable-next-line consistent-return
router.post('/', (req, res) => {
  const { body } = req;
  const { error } = helper.joiSigninSchema(body);

  if (error) {
    const errorMessage = error.details[0].message;
    return res.status(400).json({
      status: 400,
      error: errorMessage,
    });
  }

  const matchUser = usersArray.findUser(body.email);

  if (!matchUser) {
    return res.status(400).json({
      status: 400,
      error: 'User with given email does not exists',
    });
  }

  const isValidPassword = helper.comparePassword(body.password, matchUser.password);

  if (!isValidPassword) {
    return res.status(400).json({
      status: 400,
      error: 'Given password is incorrect',
    });
  }

  const token = ((email) => {
    matchUser.setToken(email);
    return matchUser.getToken();
  })(matchUser.email);

  res.status(200).json({
    status: 200,
    message: 'User is successfully logged in',
    data: {
      token,
    },
  });
});

export default router;
