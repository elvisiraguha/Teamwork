import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { config } from 'dotenv';

config(0);

const helper = {
  generateToken({ id, email, isAdmin }) {
    return jwt.sign({ id, email, isAdmin }, process.env.SECRET, { expiresIn: '2d' });
  },

  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  },

  comparePassword(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
  },

  destructureNewUser(newUser) {
    return [
      newUser.firstName,
      newUser.lastName,
      newUser.email,
      this.hashPassword(newUser.password),
      newUser.gender,
      newUser.jobRole,
      newUser.address,
      newUser.department,
      false,
    ];
  },
};

export default helper;
