import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import articlesData from './mockData/articles';

chai.use(chaiHttp);

describe('GET /api/v2/myarticles', () => {
  it('test response given no token', () => {
    chai
      .request(app)
      .get('/api/v2/myarticles')
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
      .get('/api/v2/myarticles')
      .set('x-access-token', 'invalid')
      .end((err, res) => {
        const { body } = res;
        expect(res).to.have.status(400);
        expect(body.status).to.equals(400);
        expect(body.error).to.be.a('string');
      });
  });

  it.skip('test response when there are no articles by user', () => {
    chai
      .request(app)
      .get('/api/v2/myarticles')
      .set('x-access-token', articlesData[5])
      .end((err, res) => {
        const { body } = res;
        expect(res).to.have.status(404);
        expect(body.status).to.equals(404);
        expect(body.error).to.equals('You have not created any articles Yet');
      });
  });

  it('test reaponse given the correct token', () => {
    chai
      .request(app)
      .get('/api/v2/myarticles')
      .set('x-access-token', articlesData[3])
      .end((err, res) => {
        const { body } = res;
        expect(res).to.have.status(200);
        expect(body.status).to.equals(200);
        expect(body.data).to.be.an('array');
      });
  });
});

describe('GET /api/v2/feeds', () => {
  it('test response given no token', () => {
    chai
      .request(app)
      .get('/api/v2/feeds')
      .end((err, res) => {
        const { body } = res;
        expect(res).to.have.status(401);
        expect(body.status).to.equals(401);
        expect(body.error).to.equals('Unauthorized: You need to have a token');
      });
  });

  it.skip('test response given invalid token', () => {
    chai
      .request(app)
      .get('/api/v2/feeds')
      .set('x-access-token', 'invalid')
      .end((err, res) => {
        const { body } = res;
        expect(res).to.have.status(400);
        expect(body.status).to.equals(400);
        expect(body.error).to.be.a('string');
      });
  });

  it('test reaponse given the correct token', () => {
    chai
      .request(app)
      .get('/api/v2/feeds')
      .set('x-access-token', articlesData[3])
      .end((err, res) => {
        const { body } = res;
        expect(res).to.have.status(200);
        expect(body.status).to.equals(200);
        expect(body.message).to.equals('articles successfully loaded');
        expect(body.data).to.be.an('array');
      });
  });
});

describe('POST /api/v2/articles/<artilceId>/comments', () => {
  it('test response given no token', () => {
    chai
      .request(app)
      .post('/api/v2/articles/1/comments')
      .send(articlesData[2])
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
      .post('/api/v2/articles/1/comments')
      .set('x-access-token', 'invalid')
      .send(articlesData[2])
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
      .post('/api/v2/articles/r/comments')
      .set('x-access-token', articlesData[4])
      .send(articlesData[2])
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
      .post('/api/v2/articles/9/comments')
      .set('x-access-token', articlesData[3])
      .send(articlesData[2])
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
      .post('/api/v2/articles/1/comments')
      .set('x-access-token', articlesData[4])
      .send({})
      .end((err, res) => {
        const { body } = res;
        expect(res).to.have.status(400);
        expect(body.status).to.equals(400);
        expect(body.error).to.be.a('string');
        expect(body.error).to.have.lengthOf.at.least(10);
      });
  });

  it('test response given all required information', () => {
    chai
      .request(app)
      .post('/api/v2/articles/1/comments')
      .set('x-access-token', articlesData[4])
      .send(articlesData[2])
      .end((err, res) => {
        const { body } = res;
        expect(res).to.have.status(201);
        expect(body.status).to.equals(201);
        expect(body.message).to.equal('comment successfully added');
      });
  });
});

describe('GET /articles/<articleId>', () => {
  it('test response given no token', () => {
    chai
      .request(app)
      .get('/api/v2/articles/1')
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
      .get('/api/v2/articles/1')
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
      .get('/api/v2/articles/invalidId')
      .set('x-access-token', articlesData[4])
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
      .get('/api/v2/articles/900')
      .set('x-access-token', articlesData[4])
      .end((err, res) => {
        const { body } = res;
        expect(res).to.have.status(404);
        expect(body.status).to.equals(404);
        expect(body.error).to.equal('Article with given id does not exists');
      });
  });

  it('test reaponse given the correct token', () => {
    chai
      .request(app)
      .get('/api/v2/articles/1')
      .set('x-access-token', articlesData[4])
      .end((err, res) => {
        const { body } = res;
        expect(res).to.have.status(200);
        expect(body.status).to.equals(200);
        expect(body.message).to.equals('article successfully fetched');
      });
  });
});

describe('POST /api/v2/articles', () => {
  it('test response given no token', () => {
    chai
      .request(app)
      .post('/api/v2/articles')
      .send(articlesData[0])
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
      .post('/api/v2/articles')
      .set('x-access-token', 'invalid')
      .send(articlesData[0])
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
      .post('/api/v2/articles')
      .set('x-access-token', articlesData[3])
      .send({})
      .end((err, res) => {
        const { body } = res;
        expect(res).to.have.status(400);
        expect(body.status).to.equals(400);
        expect(body.error).to.be.a('string');
        expect(body.error).to.have.lengthOf.at.least(10);
      });
  });

  it('test response given all required information', () => {
    chai
      .request(app)
      .post('/api/v2/articles')
      .set('x-access-token', articlesData[3])
      .send(articlesData[0])
      .end((err, res) => {
        const { body } = res;
        expect(res).to.have.status(201);
        expect(body.status).to.equals(201);
        expect(body.message).to.equal('article successfully created');
        expect(body.data).to.be.an('object');
      });
  });
});

describe('PATCH /articles/<articleId>', () => {
  it('test response given no token', () => {
    chai
      .request(app)
      .patch('/api/v2/articles/2')
      .send(articlesData[1])
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
      .patch('/api/v2/articles/2')
      .set('x-access-token', 'invalid')
      .send(articlesData[1])
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
      .patch('/api/v2/articles/invalidId')
      .set('x-access-token', articlesData[3])
      .send(articlesData[1])
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
      .patch('/api/v2/articles/900')
      .set('x-access-token', articlesData[3])
      .send(articlesData[1])
      .end((err, res) => {
        const { body } = res;
        expect(res).to.have.status(404);
        expect(body.status).to.equals(404);
        expect(body.error).to.equal('Article with given id does not exists');
      });
  });

  it.skip('test response if you are trying to edit an article which is not yours', () => {
    chai
      .request(app)
      .delete('/api/v2/articles/2')
      .set('x-access-token', articlesData[4])
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
      .patch('/api/v2/articles/2')
      .set('x-access-token', articlesData[3])
      .send({})
      .end((err, res) => {
        const { body } = res;
        expect(res).to.have.status(400);
        expect(body.status).to.equals(400);
        expect(body.error).to.be.a('string');
        expect(body.error).to.have.lengthOf.at.least(10);
      });
  });

  it('test response given all required information', () => {
    chai
      .request(app)
      .patch('/api/v2/articles/2')
      .set('x-access-token', articlesData[3])
      .send(articlesData[1])
      .end((err, res) => {
        const { body } = res;
        expect(res).to.have.status(200);
        expect(body.status).to.equals(200);
        expect(body.message).to.equal('article successfully edited');
        expect(body.data).to.be.an('object');
      });
  });
});

describe('DELETE /articles/<articleId>', () => {
  it('test response given no token', () => {
    chai
      .request(app)
      .delete('/api/v2/articles/2')
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
      .delete('/api/v2/articles/2')
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
      .delete('/api/v2/articles/invalidId')
      .set('x-access-token', articlesData[3])
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
      .delete('/api/v2/articles/900')
      .set('x-access-token', articlesData[3])
      .end((err, res) => {
        const { body } = res;
        expect(res).to.have.status(404);
        expect(body.status).to.equals(404);
        expect(body.error).to.equal('Article with given id does not exists');
      });
  });

  it.skip('test response if you are trying to delete an article which is not yours', () => {
    chai
      .request(app)
      .delete('/api/v2/articles/2')
      .set('x-access-token', articlesData[3])
      .end((err, res) => {
        const { body } = res;
        expect(res).to.have.status(403);
        expect(body.status).to.equals(403);
        expect(body.error).to.equal('Forbidden: You are not owner of given article');
      });
  });

  it('test response if given information are correct', () => {
    chai
      .request(app)
      .delete('/api/v2/articles/2')
      .set('x-access-token', articlesData[3])
      .end((err, res) => {
        expect(res).to.have.status(204);
      });
  });
});
