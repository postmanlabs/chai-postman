var chai = require('chai'),
    sdk = require('postman-collection'),

    Request = sdk.Request,
    expect = chai.expect;

chai.use(require('../../')(sdk));

describe('request assertions', function () {
    describe('.postmanRequestOrResponse', function () {
        it('should not throw an error for valid requests', function () {
            var req = new Request();

            expect(req).to.be.a.postmanRequestOrResponse;
        });

        it('should throw an error for invalid requests', function () {
            var req = {};

            expect(req).to.not.be.a.postmanRequestOrResponse;
            expect(function () {
                expect(req).to.be.a.postmanRequestOrResponse;
            }).to.throw('expecting a postman request or response object but got {}');
        });

        it('should throw an error for invalid negated assertions', function () {
            var req = new Request();

            expect(function () {
                expect(req).to.not.be.a.postmanRequestOrResponse;
            }).to.throw('not expecting a postman request or response object');
        });
    });

    describe('.postmanRequest', function () {
        it('should not throw an exception for valid Request instances', function () {
            var req = new Request();

            expect(req).to.be.a.postmanRequest;
        });

        it('should throw an exception for invalid Request instances', function () {
            var req = {};

            expect(req).to.not.be.a.postmanRequest;
            expect(function () {
                expect(req).to.be.a.postmanRequest;
            }).to.throw('expecting a postman request object but got {}');
        });

        it('should throw an exception for invalid negated Request instance assertions', function () {
            var req = new Request();

            expect(function () {
                expect(req).to.not.be.a.postmanRequest;
            }).to.throw('not expecting a postman request object');
        });
    });

    describe('.header', function () {
        it('should not throw an error for valid header states', function () {
            var req = new Request({
                header: [{ key: 'Content-Type', value: 'application/json; charset=utf-8' }]
            });

            expect(req).to.have.header('Content-Type', 'application/json; charset=utf-8');
        });

        it.skip('should handle negated value assertions correctly', function () {
            var req = new Request({
                header: [{ key: 'Content-Type', value: 'application/json; charset=utf-8' }]
            });

            expect(req).to.not.have.header('Content-Type', 'application/xml');
        });

        it('should handle negated key assertions correctly', function () {
            var req = new Request({
                header: [{ key: 'Content-Type', value: 'application/json; charset=utf-8' }]
            });

            expect(req).to.not.have.header('Cache-Control');
        });

        it('should throw an error for invalid header states', function () {
            var req = new Request({
                header: [{ key: 'Content-Type', value: 'application/json; charset=utf-8' }]
            });

            expect(function () {
                expect(req).to.have.header('Content-Type', 'application/xml');
            // eslint-disable-next-line max-len
            }).to.throw('expected \'Content-Type\' request header to be \'application/xml\' but got \'application/json; charset=utf-8\'');
        });

        it('should throw an error for negated invalid header states', function () {
            var req = new Request({
                header: [{ key: 'Content-Type', value: 'application/json; charset=utf-8' }]
            });

            expect(function () {
                expect(req).to.not.have.header('Content-Type', 'application/json; charset=utf-8');
            }).to.throw('expected request to not have header with key \'Content-Type\'');
        });
    });
});
