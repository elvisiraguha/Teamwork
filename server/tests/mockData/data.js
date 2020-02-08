
const data = [
  // 0 incorect password
  {
    email: 'olivier@student.edu',
    password: 'incorrectPassword',
  },

  // 1 new user
  {
    firstName: 'Iraguha',
    lastName: 'Elvis',
    password: 'monkey123',
    address: 'Kigali',
    gender: 'Male',
    jobRole: 'Student',
    email: 'elvis@student.edu',
    department: 'Production',
  },
  // 2 used email
  {
    firstName: 'Iraguha',
    lastName: 'Elvis',
    password: 'monkey123',
    address: 'Kigali',
    gender: 'Male',
    jobRole: 'Student',
    email: 'olivier@student.edu',
    department: 'Production',
  },
  // 3 existing user
  {
    email: 'olivier@student.edu',
    password: 'olivier',
  },
  // 4 inexisting user
  {
    email: 'user@nonexisting.mail',
    password: 'password',
  },
];

export default data;
