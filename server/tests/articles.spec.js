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

const articlesSpec = {
  create() {
    it('test response given no token', () => {
      chai
        .request(app)
        .post('/api/v1/articles')
        .send(articlePayload)
        .end((err, res) => {
          const { body } = res;
          expect(res).to.have.status(401);
          expect(body.status).to.equals(401);
          expect(body.error).to.equals('Unauthorized: You need to have a token');
        });
    });

    it('test response given invalid token', () => {
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
    });

    it('test response given incomplete information', () => {
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
    });

    it('test response given all required information with incorrect method', () => {
      chai
        .request(app)
        .get('/api/v1/articles')
        .set('x-access-token', token2)
        .send(articlePayload)
        .end((err, res) => {
          const { body } = res;
          expect(res).to.have.status(405);
          expect(body.status).to.equals(405);
          expect(body.error).to.equal('Method not allowed');
        });
    });

    it('test response given all required information with incorrect method', () => {
      chai
        .request(app)
        .put('/api/v1/articles')
        .set('x-access-token', token2)
        .send(articlePayload)
        .end((err, res) => {
          const { body } = res;
          expect(res).to.have.status(405);
          expect(body.status).to.equals(405);
          expect(body.error).to.equal('Method not allowed');
        });
    });

    it('test response given all required information with incorrect method', () => {
      chai
        .request(app)
        .patch('/api/v1/articles')
        .set('x-access-token', token2)
        .send(articlePayload)
        .end((err, res) => {
          const { body } = res;
          expect(res).to.have.status(405);
          expect(body.status).to.equals(405);
          expect(body.error).to.equal('Method not allowed');
        });
    });

    it('test response given all required information with incorrect method', () => {
      chai
        .request(app)
        .delete('/api/v1/articles')
        .set('x-access-token', token2)
        .send(articlePayload)
        .end((err, res) => {
          const { body } = res;
          expect(res).to.have.status(405);
          expect(body.status).to.equals(405);
          expect(body.error).to.equal('Method not allowed');
        });
    });

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
    it('test response given no token', () => {
      chai
        .request(app)
        .patch(`/api/v1/articles/${fakeArticle.id}`)
        .send(modifiedArticle)
        .end((err, res) => {
          const { body } = res;
          expect(res).to.have.status(401);
          expect(body.status).to.equals(401);
          expect(body.error).to.equals('Unauthorized: You need to have a token');
        });
    });

    it('test response given invalid token', () => {
      chai
        .request(app)
        .patch(`/api/v1/articles/${fakeArticle.id}`)
        .set('x-access-token', 'invalid')
        .send(modifiedArticle)
        .end((err, res) => {
          const { body } = res;
          expect(res).to.have.status(400);
          expect(body.status).to.equals(400);
          expect(body.error).to.be.a('string');
        });
    });

    it('test response if there is no article by this user', () => {
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
    });

    it('test response if the articleId is not a number', () => {
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
    });

    it('test response if there is no article matching the given id', () => {
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
    });

    it('test response if you are trying to delete an article which is not yours', () => {
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
    });

    it('test response given incomplete information', () => {
      chai
        .request(app)
        .patch(`/api/v1/articles/${fakeArticle2.id}`)
        .set('x-access-token', token2)
        .send({})
        .end((err, res) => {
          const { body } = res;
          expect(res).to.have.status(400);
          expect(body.status).to.equals(400);
          expect(body.error).to.be.a('string');
          expect(body.error).to.have.lengthOf.at.least(10);
        });
    });

    it('test response given all required information with incorrect method', () => {
      chai
        .request(app)
        .post(`/api/v1/articles/${fakeArticle2.id}`)
        .set('x-access-token', token2)
        .send(modifiedArticle)
        .end((err, res) => {
          const { body } = res;
          expect(res).to.have.status(405);
          expect(body.status).to.equals(405);
          expect(body.error).to.equal('Method not allowed');
        });
    });

    it('test response given all required information with incorrect method', () => {
      chai
        .request(app)
        .put(`/api/v1/articles/${fakeArticle2.id}`)
        .set('x-access-token', token2)
        .send(modifiedArticle)
        .end((err, res) => {
          const { body } = res;
          expect(res).to.have.status(405);
          expect(body.status).to.equals(405);
          expect(body.error).to.equal('Method not allowed');
        });
    });

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
    it('test response given no token', () => {
      chai
        .request(app)
        .delete(`/api/v1/articles/${fakeArticle.id}`)
        .end((err, res) => {
          const { body } = res;
          expect(res).to.have.status(401);
          expect(body.status).to.equals(401);
          expect(body.error).to.equals('Unauthorized: You need to have a token');
        });
    });

    it('test response given invalid token', () => {
      chai
        .request(app)
        .delete(`/api/v1/articles/${fakeArticle.id}`)
        .set('x-access-token', 'invalid')
        .end((err, res) => {
          const { body } = res;
          expect(res).to.have.status(400);
          expect(body.status).to.equals(400);
          expect(body.error).to.be.a('string');
        });
    });

    it('test response if there is no article by this user', () => {
      chai
        .request(app)
        .delete(`/api/v1/articles/${fakeArticle.id}`)
        .set('x-access-token', token)
        .end((err, res) => {
          const { body } = res;
          expect(res).to.have.status(404);
          expect(body.status).to.equals(404);
          expect(body.error).to.equal(`Dear ${fakeUser.lastName} you have not created any articles yet!`);
        });
    });

    it('test response if the articleId is not a number', () => {
      chai
        .request(app)
        .delete('/api/v1/articles/invalidId')
        .set('x-access-token', token2)
        .end((err, res) => {
          const { body } = res;
          expect(res).to.have.status(400);
          expect(body.status).to.equals(400);
          expect(body.error).to.equal('articleId should be an Integer');
        });
    });

    it('test response if there is no article matching the given id', () => {
      chai
        .request(app)
        .delete('/api/v1/articles/900')
        .set('x-access-token', token2)
        .end((err, res) => {
          const { body } = res;
          expect(res).to.have.status(404);
          expect(body.status).to.equals(404);
          expect(body.error).to.equal('Article with given id does not exists');
        });
    });

    it('test response if you are trying to delete an article which is not yours', () => {
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
    });

    it('test response if given information are correct with incorrect method', () => {
      chai
        .request(app)
        .post(`/api/v1/articles/${fakeArticle2.id}`)
        .set('x-access-token', token2)
        .end((err, res) => {
          expect(res).to.have.status(405);
          expect(res.body.error).to.equals('Method not allowed');
        });
    });

    it('test response if given information are correct with incorrect method', () => {
      chai
        .request(app)
        .put(`/api/v1/articles/${fakeArticle2.id}`)
        .set('x-access-token', token2)
        .end((err, res) => {
          expect(res).to.have.status(405);
          expect(res.body.error).to.equals('Method not allowed');
        });
    });

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
    it('test response given no token', () => {
      chai
        .request(app)
        .get('/api/v1/feeds')
        .end((err, res) => {
          const { body } = res;
          expect(res).to.have.status(401);
          expect(body.status).to.equals(401);
          expect(body.error).to.equals('Unauthorized: You need to have a token');
        });
    });

    it('test response given invalid token', () => {
      chai
        .request(app)
        .get('/api/v1/feeds')
        .set('x-access-token', 'invalid')
        .end((err, res) => {
          const { body } = res;
          expect(res).to.have.status(400);
          expect(body.status).to.equals(400);
          expect(body.error).to.be.a('string');
        });
    });

    it('test reaponse given the correct token with incorrect method', () => {
      chai
        .request(app)
        .post('/api/v1/feeds')
        .set('x-access-token', token)
        .end((err, res) => {
          const { body } = res;
          expect(res).to.have.status(405);
          expect(body.status).to.equals(405);
          expect(body.error).to.equals('Method not allowed');
        });
    });

    it('test reaponse given the correct token with incorrect method', () => {
      chai
        .request(app)
        .put('/api/v1/feeds')
        .set('x-access-token', token)
        .end((err, res) => {
          const { body } = res;
          expect(res).to.have.status(405);
          expect(body.status).to.equals(405);
          expect(body.error).to.equals('Method not allowed');
        });
    });

    it('test reaponse given the correct token with incorrect method', () => {
      chai
        .request(app)
        .patch('/api/v1/feeds')
        .set('x-access-token', token)
        .end((err, res) => {
          const { body } = res;
          expect(res).to.have.status(405);
          expect(body.status).to.equals(405);
          expect(body.error).to.equals('Method not allowed');
        });
    });

    it('test reaponse given the correct token with incorrect method', () => {
      chai
        .request(app)
        .delete('/api/v1/feeds')
        .set('x-access-token', token)
        .end((err, res) => {
          const { body } = res;
          expect(res).to.have.status(405);
          expect(body.status).to.equals(405);
          expect(body.error).to.equals('Method not allowed');
        });
    });

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
    it('test response given no token', () => {
      chai
        .request(app)
        .post(`/api/v1/articles/${fakeArticle.id}/comments`)
        .send(commentPayload)
        .end((err, res) => {
          const { body } = res;
          expect(res).to.have.status(401);
          expect(body.status).to.equals(401);
          expect(body.error).to.equals('Unauthorized: You need to have a token');
        });
    });

    it('test response given invalid token', () => {
      chai
        .request(app)
        .post(`/api/v1/articles/${fakeArticle.id}/comments`)
        .set('x-access-token', 'invalid')
        .send(commentPayload)
        .end((err, res) => {
          const { body } = res;
          expect(res).to.have.status(400);
          expect(body.status).to.equals(400);
          expect(body.error).to.be.a('string');
        });
    });

    it('test response if the articleId is not a number', () => {
      chai
        .request(app)
        .post('/api/v1/articles/r/comments')
        .set('x-access-token', token2)
        .send(commentPayload)
        .end((err, res) => {
          const { body } = res;
          expect(res).to.have.status(400);
          expect(body.status).to.equals(400);
          expect(body.error).to.equal('articleId should be an Integer');
        });
    });

    it('test response if there is no article matching the given id', () => {
      chai
        .request(app)
        .post('/api/v1/articles/900/comments')
        .set('x-access-token', token)
        .send(commentPayload)
        .end((err, res) => {
          const { body } = res;
          expect(res).to.have.status(404);
          expect(body.status).to.equals(404);
          expect(body.error).to.equal('Article with given id does not exists');
        });
    });

    it('test response given incomplete information', () => {
      chai
        .request(app)
        .post(`/api/v1/articles/${fakeArticle.id}/comments`)
        .set('x-access-token', token)
        .send({})
        .end((err, res) => {
          const { body } = res;
          expect(res).to.have.status(400);
          expect(body.status).to.equals(400);
          expect(body.error).to.be.a('string');
          expect(body.error).to.have.lengthOf.at.least(10);
        });
    });

    it('test response given all required information with incorrect method', () => {
      chai
        .request(app)
        .get(`/api/v1/articles/${fakeArticle.id}/comments`)
        .set('x-access-token', token)
        .send(commentPayload)
        .end((err, res) => {
          const { body } = res;
          expect(res).to.have.status(405);
          expect(body.status).to.equals(405);
          expect(body.error).to.equal('Method not allowed');
        });
    });

    it('test response given all required information with incorrect method', () => {
      chai
        .request(app)
        .put(`/api/v1/articles/${fakeArticle.id}/comments`)
        .set('x-access-token', token)
        .send(commentPayload)
        .end((err, res) => {
          const { body } = res;
          expect(res).to.have.status(405);
          expect(body.status).to.equals(405);
          expect(body.error).to.equal('Method not allowed');
        });
    });

    it('test response given all required information with incorrect method', () => {
      chai
        .request(app)
        .patch(`/api/v1/articles/${fakeArticle.id}/comments`)
        .set('x-access-token', token)
        .send(commentPayload)
        .end((err, res) => {
          const { body } = res;
          expect(res).to.have.status(405);
          expect(body.status).to.equals(405);
          expect(body.error).to.equal('Method not allowed');
        });
    });

    it('test response given all required information with incorrect method', () => {
      chai
        .request(app)
        .delete(`/api/v1/articles/${fakeArticle.id}/comments`)
        .set('x-access-token', token)
        .send(commentPayload)
        .end((err, res) => {
          const { body } = res;
          expect(res).to.have.status(405);
          expect(body.status).to.equals(405);
          expect(body.error).to.equal('Method not allowed');
        });
    });

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
    it('test response given no token', () => {
      chai
        .request(app)
        .get('/api/v1/articles/2')
        .end((err, res) => {
          const { body } = res;
          expect(res).to.have.status(401);
          expect(body.status).to.equals(401);
          expect(body.error).to.equals('Unauthorized: You need to have a token');
        });
    });

    it('test response given invalid token', () => {
      chai
        .request(app)
        .get('/api/v1/articles/2')
        .set('x-access-token', 'invalid')
        .end((err, res) => {
          const { body } = res;
          expect(res).to.have.status(400);
          expect(body.status).to.equals(400);
          expect(body.error).to.be.a('string');
        });
    });

    it('test response if the articleId is not a number', () => {
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
    });

    it('test response if there is no article matching the given id', () => {
      chai
        .request(app)
        .get('/api/v1/articles/900')
        .set('x-access-token', token)
        .end((err, res) => {
          const { body } = res;
          expect(res).to.have.status(404);
          expect(body.status).to.equals(404);
          expect(body.error).to.equal('Article with given id does not exists');
        });
    });

    it('test reaponse given the correct token with incorrect method', () => {
      chai
        .request(app)
        .post('/api/v1/articles/2')
        .set('x-access-token', token)
        .end((err, res) => {
          const { body } = res;
          expect(res).to.have.status(405);
          expect(body.status).to.equals(405);
          expect(body.error).to.equals('Method not allowed');
        });
    });

    it('test reaponse given the correct token with incorrect method', () => {
      chai
        .request(app)
        .put('/api/v1/articles/2')
        .set('x-access-token', token)
        .end((err, res) => {
          const { body } = res;
          expect(res).to.have.status(405);
          expect(body.status).to.equals(405);
          expect(body.error).to.equals('Method not allowed');
        });
    });

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
