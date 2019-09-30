"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var usersArray = {
  storageArray: [{
    id: '1964ec18-8458-40af-9f2d-9d034665e6a4',
    firstName: 'Elvis',
    lastName: 'Iraguha',
    email: 'iraguhaelvis@gmail.com',
    password: '$2b$08$Oi4q3GSNAbPOlS.wt5MedeQKlJoA5P3lvdu1c6RdRYVHrTG5gVfmy',
    gender: 'Male',
    jobRole: 'Student',
    department: 'Production',
    address: 'Kigali/Rwanda',
    isAdmin: true
  }, {
    id: '538bdd77-38af-4928-9bb0-d02461c7da34',
    firstName: 'Olivier',
    lastName: 'Nshimiyimana',
    email: 'nshimiye@student.edu',
    password: '$2b$08$mB9u9q5equDrY1L2IcHfR.gVWJarNCwO917nEVo3DM6IVSMgz.Pc.',
    gender: 'Male',
    jobRole: 'Student',
    department: 'Production',
    address: 'Kigali/Rwanda',
    isAdmin: false
  }, {
    id: 'dd7f21c1-b92c-4703-a6d9-3ec03eef4da9',
    firstName: 'Seth',
    lastName: 'Bizimana',
    email: 'bizimana@student.edu',
    password: '$2b$08$NX9KDJw6bI0spqXMLwdw.uSlCmpwcb4ye9uIDNgf/dAEzcPin/6C6',
    gender: 'Male',
    jobRole: 'Student',
    department: 'Production',
    address: 'Kigali/Rwanda',
    isAdmin: false
  }],
  addUser: function addUser(user) {
    this.storageArray.push(user);
  },
  findUser: function findUser(key, value) {
    return this.storageArray.find(function (user) {
      return user[key] === value;
    });
  }
};
var _default = usersArray;
exports["default"] = _default;