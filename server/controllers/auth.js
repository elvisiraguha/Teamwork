import helper from '../helpers/helper';
import User from '../helpers/User';
import usersArray from '../models/usersArray';

const auth = {
  signup(req, res) {
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
  },
  signin(req, res) {
    const { body } = req;
    const { error } = helper.joiSigninSchema(body);

    if (error) {
      const errorMessage = error.details[0].message;
      return res.status(400).json({
        status: 400,
        error: errorMessage,
      });
    }

    const matchUser = usersArray.findUser('email', body.email);

    if (!matchUser) {
      return res.status(404).json({
        status: 404,
        error: 'User with given email does not exists',
      });
    }

    const isValidPassword = helper.comparePassword(body.password, matchUser.password);

    if (!isValidPassword) {
      return res.status(401).json({
        status: 401,
        error: 'Given password is incorrect',
      });
    }

    const token = helper.generateToken(matchUser);

    res.status(200).json({
      status: 200,
      message: 'User is successfully logged in',
      data: {
        token,
      },
    });
  },
};

export default auth;
