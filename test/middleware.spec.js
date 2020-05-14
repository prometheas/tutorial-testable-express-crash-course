const express = require('express');
const expect = require('chai').expect;
const expressMocks = require('sinon-express-mock');
const mockPromises = require('mock-promises');
const sinon = require('sinon');
const winston = require('winston');

const middleware = require('../lib/middleware');

describe('middleware functions', () => {
    describe('#determineTitleForPerson()', () => {
        let req;
        let res;
        let app;

        beforeEach(() => {
            req = expressMocks.mockReq();
            res = expressMocks.mockRes();

            app = express();
            app.set('logger', winston);

            req.app = res.app = app;
        })

        it('should throw when res.locals.person is undefined', () => {
            expect(() => {
                middleware.determineTitleForPerson(req, res, () => {
                    // done();
                });
            }).to.throw(/person/);
        });

        it('should render "Ms." for female characters', (done) => {
            res.locals.person = {
                gender: 'female'
            };

            middleware.determineTitleForPerson(req, res, () => {
                const title = res.locals.title;
                expect(title).not.to.be.undefined;
                expect(title).to.equal('Ms.')
                done();
            });
        });

        it('should render "Mr." for males characters', (done) => {
            res.locals.person = {
                gender: 'male'
            };

            middleware.determineTitleForPerson(req, res, () => {
                const title = res.locals.title;
                expect(title).not.to.be.undefined;
                expect(title).to.equal('Mr.')
                done();
            });
        });
    });

    describe('#querySwapi()', () => {
        Promise = mockPromises.getMockPromise(Promise);

        it('should call the API client\'s get() method with "people"', (done) => {
            const req = expressMocks.mockReq();
            const res = expressMocks.mockRes();

            const app = express();
            req.app = res.app = app;

            const swapi = {
                get: () => {
                    return new Promise();
                }
            };

            sinon.spy(swapi, 'get');

            app.set('swapi', swapi);

            middleware.querySwapi(req, res, () => {
                expect(swapi.get.called).to.be.false;
                done();
            });
        });
    });
});
