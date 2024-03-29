import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '..';
import { describe, it } from 'node:test';

const { expect } = chai;

chai.use(chaiHttp);

describe('Controller Tests', () => {
  // Test for GET /getMyList
  describe('GET /getMyList', () => {
    it('should return status 200 and user list', async () => {
      const res = await chai.request(app).get('/getMyList?id=1');
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
    });

    it('should return status 400 for missing userId', async () => {
      const res = await chai.request(app).get('/getMyList');
      expect(res).to.have.status(400);
    });
  });

  // Test for POST /addToList
  describe('POST /addToList', () => {
    it('should return status 201 and item added message', async () => {
      const data = { userId: '1', itemId: 'itemIdHere', 1: 'movie' };
      const res = await chai.request(app).post('/addToList').send(data);
      expect(res).to.have.status(201);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('message').equal('Item added to the list');
    });

    it('should return status 400 for invalid input', async () => {
      const invalidData = {};
      const res = await chai.request(app).post('/addToList').send(invalidData);
      expect(res).to.have.status(400);
    });
  });

  // Test for DELETE /removeFromList
  describe('DELETE /removeFromList', () => {
    it('should return status 200 and item removed message', async () => {
      const userId = '1';
      const itemId = '1';
      const itemType = 'tv';
      const res = await chai.request(app).delete(`/removeFromList/${userId}/${itemId}/${itemType}`);
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('message').equal('Item removed from the list');
    });

    it('should return status 400 for invalid input', async () => {
      const invalidData = {};
      const res = await chai.request(app).delete('/removeFromList').send(invalidData);
      expect(res).to.have.status(400);
    });
  });
});
