import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import data from './mockData/articles';

chai.use(chaiHttp);

const {
  article,
  modifiedArticle,
  comment,
  fakeArticle,
  fakeArticle2,
  token,
  token2,
} = data;

const articlesSpec = {
  create() {
    it('test response given no token', () => {
      chai
        .request(app)
        .post('/api/v1/articles')
        .send(article)
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
        .send(article)
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
        .put('/api/v1/articles')
        .set('x-access-token', token2)
        .send(article)
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
        .send(article)
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
        .send(article)
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
        .send(article)
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
          expect(body.error).to.equal('Forbidden: You are not owner of given article');
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
          expect(body.error).to.equal('Forbidden: You are not owner of given article');
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
  findByCategory() {
    it('test response given no token', () => {
      chai
        .request(app)
        .get('/api/v1/articles?category=art')
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
        .get('/api/v1/articles?category=art')
        .set('x-access-token', 'invalid')
        .end((err, res) => {
          const { body } = res;
          expect(res).to.have.status(400);
          expect(body.status).to.equals(400);
          expect(body.error).to.be.a('string');
        });
    });

    it('test response given no category in query', () => {
      chai
        .request(app)
        .get('/api/v1/articles')
        .set('x-access-token', token)
        .end((err, res) => {
          const { body } = res;
          expect(res).to.have.status(400);
          expect(body.status).to.equals(400);
          expect(body.error).to.equals('Provide a category in query please!');
        });
    });

    it('test reaponse when no category matching the queried category', () => {
      chai
        .request(app)
        .get('/api/v1/articles')
        .query({ category: 'unavailable' })
        .set('x-access-token', token)
        .end((err, res) => {
          const { body } = res;
          expect(res).to.have.status(404);
          expect(body.status).to.equals(404);
          expect(body.error).to.equals('No article belongs to the category provided');
        });
    });

    it('test reaponse given the correct token with incorrect method', () => {
      chai
        .request(app)
        .put('/api/v1/articles')
        .query({ category: 'art' })
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
        .patch('/api/v1/articles')
        .query({ category: 'art' })
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
        .delete('/api/v1/articles')
        .query({ category: 'art' })
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
        .get('/api/v1/articles')
        .query({ category: 'art' })
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
        .send(comment)
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
        .send(comment)
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
        .send(comment)
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
        .send(comment)
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
        .send(comment)
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
        .send(comment)
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
        .send(comment)
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
        .send(comment)
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
        .send(comment)
        .end((err, res) => {
          const { body } = res;
          expect(res).to.have.status(201);
          expect(body.status).to.equals(201);
          expect(body.message).to.equal('comment successfully added');
          expect(body.data.comment).to.be.an('object');
          expect(body.data.articleTitle).to.be.a('string');
          expect(body.data.article).to.be.a('string');
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
  myarticles() {
    it('test response given no token', () => {
      chai
        .request(app)
        .get('/api/v1/myarticles')
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
        .get('/api/v1/myarticles')
        .set('x-access-token', 'invalid')
        .end((err, res) => {
          const { body } = res;
          expect(res).to.have.status(400);
          expect(body.status).to.equals(400);
          expect(body.error).to.be.a('string');
        });
    });

    it('test response when there are no articles by user', () => {
      chai
        .request(app)
        .get('/api/v1/myarticles')
        .set('x-access-token', token)
        .end((err, res) => {
          const { body } = res;
          expect(res).to.have.status(404);
          expect(body.status).to.equals(404);
          expect(body.error).to.equals('You have not created any articles Yet');
        });
    });

    it('test reaponse given the correct token with incorrect method', () => {
      chai
        .request(app)
        .post('/api/v1/myarticles')
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
        .put('/api/v1/myarticles')
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
        .patch('/api/v1/myarticles')
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
        .delete('/api/v1/myarticles')
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
        .get('/api/v1/myarticles')
        .set('x-access-token', token2)
        .end((err, res) => {
          const { body } = res;
          expect(res).to.have.status(200);
          expect(body.status).to.equals(200);
          expect(body.message).to.equals('success');
          expect(body.data).to.be.an('array');
        });
    });
  },
};


export default articlesSpec;
