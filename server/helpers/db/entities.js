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

  static article({ article, title, categories }, { id: authorid }) {
    const createdon = new Date();
    return [
      title,
      article,
      createdon,
      authorid,
      categories,
    ];
  }
}

export default Entities;
