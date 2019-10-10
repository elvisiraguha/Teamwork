
const data = [
  // 0
  {},
  // 1 new user
  {
    firstName: 'Iraguha',
    lastName: 'Elvis',
    password: 'monkey123',
    address: 'Kigali/Rwanda',
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
    address: 'Kigali/Rwanda',
    gender: 'Male',
    jobRole: 'Student',
    email: 'olivier@student.edu',
    department: 'Production',
  },
  // 3 existing user
  {
    email: 'elvis@student.edu',
    password: 'monkey123',
  },
  // 4 inexisting user
  {
    email: 'user@nonexisting.mail',
    password: 'password',
  },
  // 5 incorect password
  {
    email: 'elvis@student.edu',
    password: 'incorrect password',
  },

];

export default data;
