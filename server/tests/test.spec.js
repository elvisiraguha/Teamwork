import signupSpec from './signup.spec';
import signinSpec from './signin.spec';
import createArticleSpec from './createArticle.spec';
import editArticleSpec from './editArticle.spec';
import deleteArticleSpec from './deleteArticle.spec';
import addCommentSpec from './addComment.spec';
import feeds from './feeds.spec';

describe('POST /api/v1/auth/signup', signupSpec);
describe('POST /api/v1/auth/signin', signinSpec);
describe('POST /api/v1/articles', createArticleSpec);
describe('PATCH /articles/<articleId>', editArticleSpec);
describe('PATCH /articles/<articleId>', deleteArticleSpec);
describe('POST /api/v1/articles/<artilceId>/comments', addCommentSpec);
describe('POST /api/v1/feeds', feeds);
