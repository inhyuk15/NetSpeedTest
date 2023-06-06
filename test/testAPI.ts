import { expect } from 'chai';
import request from 'supertest';
import { type IMeasurementResult } from '../src/models/MeasurementResult';

const testServer = `http://localhost:4000`;

describe('GET /api/speedtest', function () {
  it('should return array of data', async function () {
    const response = await request(testServer).get('/api/speedtest');

    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
    response.body.forEach((item: IMeasurementResult) => {
      expect(item).to.have.property('_id');
      expect(item).to.have.property('user');
      expect(item.user).to.have.property('userCookie');
      expect(item).to.have.property('speedTest');
      expect(item.speedTest).to.have.property('dlStatus');
      expect(item.speedTest).to.have.property('ulStatus');
      expect(item.speedTest).to.have.property('pingStatus');
      expect(item.speedTest).to.have.property('jitterStatus');
      expect(item).to.have.property('createdAt');
      expect(item).to.have.property('updatedAt');
    });
  });
});

describe('GET /api/speedtest_by_day?day=2', function () {
  it('should return array of data', async function () {
    const response = await request(testServer).get('/api/speedtest');

    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
    response.body.forEach((item: IMeasurementResult) => {
      expect(item).to.have.property('_id');
      expect(item).to.have.property('user');
      expect(item.user).to.have.property('userCookie');
      expect(item).to.have.property('speedTest');
      expect(item.speedTest).to.have.property('dlStatus');
      expect(item.speedTest).to.have.property('ulStatus');
      expect(item.speedTest).to.have.property('pingStatus');
      expect(item.speedTest).to.have.property('jitterStatus');
      expect(item).to.have.property('createdAt');
      expect(item).to.have.property('updatedAt');
    });
  });
});
