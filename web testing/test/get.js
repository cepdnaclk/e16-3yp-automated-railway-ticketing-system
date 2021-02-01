process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../server.js');

describe('GET /api/uncom/:Id', () => {

    it('OK, getting an user', (done) => {
        var Id = "user008"
        request(app).get('/api/uncom/:Id')
            .send(Id)
            .then((res) => {
                const body = res.body;
                expect(body.msg)
                    .to.equal('Invalid authentication')
                done();
            })
            .catch((err) => done(err));
    });

    it('OK, getting an user', (done) => {
        var Id = "user001"
        request(app).get('/api/uncom/:Id')
            .send(Id)
            .then((res) => {
                const body = res.body;
                expect(body.msg)
                    .to.equal('does not exists for this Id.')
                done();
            })
            .catch((err) => done(err));
    });

})