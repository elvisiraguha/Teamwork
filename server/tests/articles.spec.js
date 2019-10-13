import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import articlesData from './mockData/articles';

chai.use(chaiHttp);

describe('GET /api/v2/feeds', () => {
  it('test reaponse given the correct token', (done) => {
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
    done();
  });
});

describe('POST /api/v2/articles/<artilceId>/comments', () => {
  it('test response given incomplete information', (done) => {
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
    done();
  });

  it('test response given all required information', (done) => {
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
    done();
  });
});

describe('GET /articles/<articleId>', () => {
  it('test reaponse given the correct token', (done) => {
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
    done();
  });
});

describe('POST /api/v2/articles', () => {
  it('test response given incomplete information', (done) => {
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
    done();
  });

  it('test response given all required information', (done) => {
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
    done();
  });
});

describe('PATCH /articles/<articleId>', () => {
  it('test response if you are trying to edit an article which is not yours', (done) => {
    chai
      .request(app)
      .delete('/api/v2/articles/1')
      .set('x-access-token', articlesData[4])
      .end((err, res) => {
        const { body } = res;
        expect(res).to.have.status(403);
        expect(body.status).to.equals(403);
        expect(body.error).to.equal('Forbidden: You are not owner of given article');
      });
    done();
  });

  it('test response given incomplete information', (done) => {
    chai
      .request(app)
      .patch('/api/v2/articles/1')
      .set('x-access-token', articlesData[3])
      .send({})
      .end((err, res) => {
        const { body } = res;
        expect(res).to.have.status(400);
        expect(body.status).to.equals(400);
        expect(body.error).to.be.a('string');
        expect(body.error).to.have.lengthOf.at.least(10);
      });
    done();
  });

  it('test response given all required information', (done) => {
    chai
      .request(app)
      .patch('/api/v2/articles/1')
      .set('x-access-token', articlesData[3])
      .send(articlesData[1])
      .end((err, res) => {
        const { body } = res;
        expect(res).to.have.status(200);
        expect(body.status).to.equals(200);
        expect(body.message).to.equal('article successfully edited');
        expect(body.data).to.be.an('object');
      });
    done();
  });
});

describe('DELETE /articles/<articleId>', () => {
  it('test response if you are trying to delete an article which is not yours', (done) => {
    chai
      .request(app)
      .delete('/api/v2/articles/1')
      .set('x-access-token', articlesData[4])
      .end((err, res) => {
        const { body } = res;
        expect(res).to.have.status(403);
        expect(body.status).to.equals(403);
        expect(body.error).to.equal('Forbidden: You are not owner of given article');
      });
    done();
  });

  it('test response if given information are correct', (done) => {
    chai
      .request(app)
      .delete('/api/v2/articles/1')
      .set('x-access-token', articlesData[3])
      .end((err, res) => {
        expect(res).to.have.status(204);
      });
    done();
  });
});

describe('GET /api/v2/myarticles', () => {
  it('test response given no token', (done) => {
    chai
      .request(app)
      .get('/api/v2/myarticles')
      .end((err, res) => {
        const { body } = res;
        expect(res).to.have.status(401);
        expect(body.status).to.equals(401);
        expect(body.error).to.equals('Unauthorized: You need to have a token');
      });
    done();
  });

  it('test response given invalid token', (done) => {
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
    done();
  });

  it('test reaponse given the correct token', (done) => {
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
    done();
  });
});
