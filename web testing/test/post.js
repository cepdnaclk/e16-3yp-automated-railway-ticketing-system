process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../server.js');

describe('POST /user/login', () => {

    it('Fail, username is wrong', (done) => {
        request(app).post('/user/login')
            .send({ "Id": "user009", "password": "user001" })
            .then((res) => {
                const body = res.body;
                expect(body.msg)
                    .to.equal('User does not exists!')
                done();
            })
            .catch((err) => done(err));
    });

    it('Fail, password is wrong', (done) => {
        request(app).post('/user/login')
            .send({ "Id": "user001", "password": "user00p" })
            .then((res) => {
                const body = res.body;
                expect(body.msg)
                    .to.equal('Incorrect password.')
                done();
            })
            .catch((err) => done(err));
    });

    /*it('OK, new user is logged', (done) => {
        request(conn).post('/user/login')
            .send({ "Id": "user001", "password": "user001" })
            .then((res) => {
                const body = res.body;
                expect(body.accesstoken).to.equal('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMDNiYmMxZWUxODhkMjlhNDAzZGJlYSIsImlhdCI6MTYxMjA4NDc5MywiZXhwIjoxNjEyMTcxMTkzfQ.qo2FlYyMDZRJDxNVFnmkunQG6-reuOzwJ2sWqi3RYQw');
                done();
            })
            .catch((err) => done(err));
    });*/
})