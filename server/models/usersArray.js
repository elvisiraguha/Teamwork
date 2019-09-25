const usersArray = {
  storageArray: [],

  addUser(user) {
    this.storageArray.push(user);
  },

  findUser(email) {
    return this.storageArray.find((user) => user.email === email);
  },

  removeUser(email) {
    const userToRemove = this.findUser(email);
    this.storageArray.splice(userToRemove, 1);
  },
};

export default usersArray;
