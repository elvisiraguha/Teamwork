import helper from './helper';
import usersArray from '../models/usersArray';

class User {
  constructor(user) {
    this.id = usersArray.getNextId();
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.password = helper.hashPassword(user.password);
    this.gender = user.gender;
    this.jobRole = user.jobRole;
    this.department = user.department;
    this.address = user.address;
    this.isAdmin = false;
  }

  makeAdmin() {
    this.isAdmin = true;
  }
}

export default User;
