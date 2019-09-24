import helper from './helper';

class User {
  constructor(user) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.password = helper.hashPassword(user.password);
    this.gender = user.gender;
    this.jobRole = user.jobRole;
    this.department = user.department;
    this.address = user.address;
    this.createdAt = new Date();
    this.token = helper.generateToken(this.email);
    this.articles = [];
  }
}

export default User;
