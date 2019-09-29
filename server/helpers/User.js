import uuid from 'uuid';
import helper from './helper';

class User {
  constructor(user) {
    this.id = uuid();
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
}

export default User;
