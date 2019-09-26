import uuid from 'uuid';
import helper from './helper';
import articlesArray from '../models/articlesArray';

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
    this.createdAt = helper.getDate();
  }

  getToken() {
    return this.token;
  }

  setToken(email) {
    this.token = helper.generateToken(email);
  }

  getArticles() {
    const articles = articlesArray.storageArray.filter(article => article.authorId === this.id);
    return articles.length ? articles : null;
  }

  getArticleById(id) {
    const articles = this.getArticles();
    const matchArticle = articles.find(article => article.id === id);
    return matchArticle;
  }
}

export default User;
