import helper from '../helpers/helper';
import User from '../helpers/User';
import usersArray from '../models/usersArray';

class Auth {
  static signup(req, res) {
    const createdUser = new User(req.newUser);
    usersArray.addUser(createdUser);

    const token = helper.generateToken(createdUser);

    res.status(201).json({
      status: 201,
      message: 'User created successfully',
      data: {
        token,
      },
    });
  }

  static signin(req, res) {
    const matchUser = usersArray.findUser('email', req.user.email);

    if (!matchUser) {
      return res.status(404).json({
        status: 404,
        error: 'User with given email does not exists',
      });
    }

    const isValidPassword = helper.comparePassword(req.user.password, matchUser.password);

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
  }
}

export default Auth;
