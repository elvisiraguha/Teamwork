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
    this.createdAt = helper.getDate();
    this.articles = [];
  }

  getToken() {
    return this.token;
  }

  setToken(email) {
    this.token = helper.generateToken(email);
  }

  addArticle(article) {
    this.articles.push(article);
  }

  getArticles() {
    return this.articles;
  }
}

export default User;
