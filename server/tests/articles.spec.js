import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import helper from '../helpers/helper';
import usersArray from '../models/usersArray';
import articlesArray from '../models/articlesArray';

chai.use(chaiHttp);

const articlePayload = {
  title: 'My first Article',
  article: `This is the very beginning of my writing journey, Although it seems to be hard I will keep fighting,
    Thank you for reading hope to see you next time`,
};

const modifiedArticle = {
  title: 'My first Article',
  article: 'This is a modified version of my article',
};

const commentPayload = {
  comment: 'Thank you very much for this article',
};

const fakeUser = usersArray.storageArray[0];
const fakeUser2 = usersArray.storageArray[1];

const token = helper.generateToken(fakeUser);
const token2 = helper.generateToken(fakeUser2);

const fakeArticle = articlesArray.storageArray[0];
const fakeArticle2 = articlesArray.storageArray[3];

const stringId = () => {
  chai
    .request(app)
    .patch('/api/v1/articles/invalidId')
    .set('x-access-token', token2)
    .send(modifiedArticle)
    .end((err, res) => {
      const { body } = res;
      expect(res).to.have.status(400);
      expect(body.status).to.equals(400);
      expect(body.error).to.equal('articleId should be an Integer');
    });
};

const noArticleByUser = () => {
  chai
    .request(app)
    .patch(`/api/v1/articles/${fakeArticle.id}`)
    .set('x-access-token', token)
    .send(modifiedArticle)
    .end((err, res) => {
      const { body } = res;
      expect(res).to.have.status(404);
      expect(body.status).to.equals(404);
      expect(body.error).to.equal(`Dear ${fakeUser.lastName} you have not created any articles yet!`);
    });
};

const givenNoToken = () => {
  chai
    .request(app)
    .patch(`/api/v1/articles/${fakeArticle.id}`)
    .set('x-access-token', token)
    .send(modifiedArticle)
    .end((err, res) => {
      const { body } = res;
      expect(res).to.have.status(404);
      expect(body.status).to.equals(404);
      expect(body.error).to.equal(`Dear ${fakeUser.lastName} you have not created any articles yet!`);
    });
};

const givenInvalidToken = () => {
  chai
    .request(app)
    .post('/api/v1/articles')
    .set('x-access-token', 'invalid')
    .send(articlePayload)
    .end((err, res) => {
      const { body } = res;
      expect(res).to.have.status(400);
      expect(body.status).to.equals(400);
      expect(body.error).to.be.a('string');
    });
};

const noMatchArticle = () => {
  chai
    .request(app)
    .patch('/api/v1/articles/900')
    .set('x-access-token', token2)
    .send(modifiedArticle)
    .end((err, res) => {
      const { body } = res;
      expect(res).to.have.status(404);
      expect(body.status).to.equals(404);
      expect(body.error).to.equal('Article with given id does not exists');
    });
};

const givenIncompleteInfo = () => {
  chai
    .request(app)
    .post('/api/v1/articles')
    .set('x-access-token', token)
    .send({})
    .end((err, res) => {
      const { body } = res;
      expect(res).to.have.status(400);
      expect(body.status).to.equals(400);
      expect(body.error).to.be.a('string');
      expect(body.error).to.have.lengthOf.at.least(10);
    });
};

const articleNotYours = () => {
  chai
    .request(app)
    .delete(`/api/v1/articles/${fakeArticle.id}`)
    .set('x-access-token', token2)
    .end((err, res) => {
      const { body } = res;
      expect(res).to.have.status(403);
      expect(body.status).to.equals(403);
      expect(body.error).to.equal('Forbidden: An article you are trying to delete is not yours');
    });
};

const articlesSpec = {
  create() {
    it('test response given no token', givenNoToken);
    it('test response given invalid token', givenInvalidToken);
    it('test response given incomplete information', givenIncompleteInfo);
    it('test response given all required information', () => {
      chai
        .request(app)
        .post('/api/v1/articles')
        .set('x-access-token', token2)
        .send(articlePayload)
        .end((err, res) => {
          const { body } = res;
          expect(res).to.have.status(201);
          expect(body.status).to.equals(201);
          expect(body.message).to.equal('article successfully created');
          expect(body.data).to.be.an('object');
        });
    });
  },
  edit() {
    it('test response given no token', givenNoToken);
    it('test response given invalid token', givenInvalidToken);
    it('test response if there is no article by this user', noArticleByUser);
    it('test response if articleId is not a number', stringId);
    it('test response if there is no article matching the given id', noMatchArticle);
    it('test response if you are trying to delete an article which is not yours', articleNotYours);
    it('test response given incomplete information', givenIncompleteInfo);
    it('test response given all required information', () => {
      chai
        .request(app)
        .patch(`/api/v1/articles/${fakeArticle2.id}`)
        .set('x-access-token', token2)
        .send(modifiedArticle)
        .end((err, res) => {
          const { body } = res;
          expect(res).to.have.status(200);
          expect(body.status).to.equals(200);
          expect(body.message).to.equal('article successfully edited');
          expect(body.data).to.be.an('object');
        });
    });
  },
  delete() {
    it('test response given no token', givenNoToken);
    it('test response given invalid token', givenInvalidToken);
    it('test response if there is no article by this user', noArticleByUser);
    it('test response if articleId is not a number', stringId);
    it('test response if there is no article matching the given id', noMatchArticle);
    it('test response if you are trying to delete an article which is not yours', articleNotYours);
    it('test response if given information are correct', () => {
      chai
        .request(app)
        .delete(`/api/v1/articles/${fakeArticle2.id}`)
        .set('x-access-token', token2)
        .end((err, res) => {
          expect(res).to.have.status(204);
        });
    });
  },
  feeds() {
    it('test response given no token', givenNoToken);
    it('test response given invalid token', givenInvalidToken);
    it('test reaponse given the correct token', () => {
      chai
        .request(app)
        .get('/api/v1/feeds')
        .set('x-access-token', token)
        .end((err, res) => {
          const { body } = res;
          expect(res).to.have.status(200);
          expect(body.status).to.equals(200);
          expect(body.message).to.equals('success');
          expect(body.data).to.be.an('array');
        });
    });
  },
  addComment() {
    it('test response given no token', givenNoToken);
    it('test response given invalid token', givenInvalidToken);
    it('test response if articleId is not a number', stringId);
    it('test response if there is no article matching the given id', noMatchArticle);
    it('test response given incomplete information', givenIncompleteInfo);
    it('test response given all required information', () => {
      chai
        .request(app)
        .post(`/api/v1/articles/${fakeArticle.id}/comments`)
        .set('x-access-token', token)
        .send(commentPayload)
        .end((err, res) => {
          const { body } = res;
          expect(res).to.have.status(201);
          expect(body.status).to.equals(201);
          expect(body.message).to.equal('comment successfully added');
          expect(body.data).to.be.an('object');
        });
    });
  },
  getOne() {
    it('test response given no token', givenNoToken);
    it('test response given invalid token', givenInvalidToken);
    it('test response if there is no article matching the given id', noMatchArticle);
    it('test reaponse given the correct token', () => {
      chai
        .request(app)
        .get('/api/v1/articles/2')
        .set('x-access-token', token)
        .end((err, res) => {
          const { body } = res;
          expect(res).to.have.status(200);
          expect(body.status).to.equals(200);
          expect(body.message).to.equals('success');
          expect(body.data).to.be.an('object');
        });
    });
  },
};


export default articlesSpec;
