import helper from '../../helpers/helper';

const articlesData = [
  // 0 new article
  {
    title: 'My first Article',
    article: `This is the very beginning of my writing journey, Although it seems to be hard I will keep fighting,
    Thank you for reading hope to see you next time`,
    categories: ['art'],
  },
  // 1 modified article
  {
    title: 'My first Article',
    article: 'This is a modified version of article',
  },
  // 2 comment
  {
    comment: 'Thank you very much for this article',
  },
  // 3 token1
  helper.generateToken({ id: 1, email: 'olivier@student.edu', isAdmin: false }),
  // 4 token2
  helper.generateToken({ id: 2, email: 'seth@student.edu', isAdmin: false }),
  // 5 token3
  helper.generateToken({ id: 3, email: 'nshimiye@student.edu', isAdmin: false }),
];

export default articlesData;
