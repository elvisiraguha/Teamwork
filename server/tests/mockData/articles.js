import usersArray from '../../models/dataStructure/usersArray';
import articlesArray from '../../models/dataStructure/articlesArray';
import helper from '../../helpers/helper';

const data = {
  fakeUser: usersArray.storageArray[0],
  fakeUser2: usersArray.storageArray[1],

  token: helper.generateToken(usersArray.storageArray[0]),
  token2: helper.generateToken(usersArray.storageArray[1]),

  fakeArticle: articlesArray.storageArray[0],
  fakeArticle2: articlesArray.storageArray[3],
  article: {
    title: 'My first Article',
    article: `This is the very beginning of my writing journey, Although it seems to be hard I will keep fighting,
    Thank you for reading hope to see you next time`,
    categories: ['art'],
  },

  modifiedArticle: {
    title: 'My first Article',
    article: 'This is a modified version of article',
  },

  comment: {
    comment: 'Thank you very much for this article',
  },
};

export default data;
