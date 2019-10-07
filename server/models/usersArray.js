const usersArray = {
  storageArray: [
    {
      id: '1',
      firstName: 'Elvis',
      lastName: 'Iraguha',
      email: 'iraguhaelvis@gmail.com',
      password: '$2b$08$Oi4q3GSNAbPOlS.wt5MedeQKlJoA5P3lvdu1c6RdRYVHrTG5gVfmy',
      gender: 'Male',
      jobRole: 'Student',
      department: 'Production',
      address: 'Kigali/Rwanda',
      isAdmin: true,
    },
    {
      id: '2',
      firstName: 'Olivier',
      lastName: 'Nshimiyimana',
      email: 'nshimiye@student.edu',
      password: '$2b$08$mB9u9q5equDrY1L2IcHfR.gVWJarNCwO917nEVo3DM6IVSMgz.Pc.',
      gender: 'Male',
      jobRole: 'Student',
      department: 'Production',
      address: 'Kigali/Rwanda',
      isAdmin: false,
    },
    {
      id: '3',
      firstName: 'Seth',
      lastName: 'Bizimana',
      email: 'bizimana@student.edu',
      password: '$2b$08$NX9KDJw6bI0spqXMLwdw.uSlCmpwcb4ye9uIDNgf/dAEzcPin/6C6',
      gender: 'Male',
      jobRole: 'Student',
      department: 'Production',
      address: 'Kigali/Rwanda',
      isAdmin: false,
    },
  ],

  addUser(user) {
    this.storageArray.push(user);
  },

  findUser(key, value) {
    return this.storageArray.find(user => user[key] === value);
  },

  getNextId() {
    return this.storageArray.length + 1;
  },
};

export default usersArray;
