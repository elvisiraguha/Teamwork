import signup from './signup.spec';
import signin from './signin.spec';
import createArticle from './createArticle.spec';
import editArticle from './editArticle.spec';
import deleteArticle from './deleteArticle.spec';
import addComment from './addComment.spec';
import feeds from './feeds.spec';
import specificArticle from './specificArticle.spec';

describe('POST /api/v1/auth/signup', signup);
describe('POST /api/v1/auth/signin', signin);
describe('POST /api/v1/articles', createArticle);
describe('PATCH /articles/<articleId>', editArticle);
describe('PATCH /articles/<articleId>', deleteArticle);
describe('POST /api/v1/articles/<artilceId>/comments', addComment);
describe('POST /api/v1/feeds', feeds);
describe('POST /api/v1/articles', specificArticle);
