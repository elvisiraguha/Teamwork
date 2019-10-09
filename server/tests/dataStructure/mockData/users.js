const mockData = {
  newUser: {
    firstName: 'Iraguha',
    lastName: 'Elvis',
    password: 'monkey123',
    address: 'Kigali/Rwanda',
    gender: 'Male',
    jobRole: 'Student',
    email: 'elvis@student.edu',
    department: 'Production',
  },

  existingUser: {
    email: 'elvis@student.edu',
    password: 'monkey123',
  },

  nonExistingUser: {
    email: 'user@nonexisting.mail',
    password: 'password',
  },

  existingUserPasswdIncorrect: {
    email: 'elvis@student.edu',
    password: 'incorrect password',
  },
};

export default mockData;
