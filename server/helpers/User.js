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
  }

  dislayUser() {
    return ({
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      gender: this.gender,
      jobRole: this.jobRole,
      department: this.department,
      address: this.address,
    });
  }
}

export default User;
