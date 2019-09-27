const usersArray = {
  storageArray: [],

  addUser(user) {
    this.storageArray.push(user);
  },

  findUser(email) {
    return this.storageArray.find(user => user.email === email);
  },

  findAuthor(token) {
    return this.storageArray.find(user => user.token === token);
  },

  resetStorage() {
    this.storageArray = [];
  },
};

export default usersArray;
