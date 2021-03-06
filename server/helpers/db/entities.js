import helper from '../helper';

class Entities {
  static user(newUser) {
    return [
      newUser.firstName,
      newUser.lastName,
      newUser.email,
      helper.hashPassword(newUser.password),
      newUser.gender,
      newUser.jobRole,
      newUser.address,
      newUser.department,
      false,
    ];
  }

  static article({ article, title }, { id: authorid }) {
    const createdon = new Date();
    return [
      title,
      article,
      createdon,
      authorid,
    ];
  }

  static comment({ comment }, { article, id: articleId }, { id: authorid }) {
    const createdon = new Date();
    return [
      comment,
      article,
      articleId,
      createdon,
      authorid,
    ];
  }
}

export default Entities;
