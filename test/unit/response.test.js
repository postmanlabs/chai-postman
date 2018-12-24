var _ = require('lodash'),
    Ajv = require('ajv'),
    chai = require('chai'),
    sdk = require('postman-collection'),

    Response = sdk.Response,
    expect = chai.expect;

chai.use(require('../../')(sdk, _, Ajv));

describe('response assertions', function () {
    describe('.postmanRequestOrResponse', function () {
        it('should not throw an error for valid Responses', function () {
            var res = new Response();

            expect(res).to.be.a.postmanRequestOrResponse;
        });

        it('should throw an error for invalid Responses', function () {
            var res = {};

            expect(res).to.not.be.a.postmanRequestOrResponse;
            expect(function () {
                expect(res).to.be.a.postmanRequestOrResponse;
            }).to.throw('expecting a postman request or response object but got {}');
        });

        it('should handle invalid negated assertions correctly', function () {
            var res = new Response();

            expect(function () {
                expect(res).to.not.be.a.postmanRequestOrResponse;
            }).to.throw('not expecting a postman request or response object');
        });
    });

    describe('.postmanResponse', function () {
        it('should not throw an exception for valid Response instances', function () {
            var res = new Response();

            expect(res).to.be.a.postmanResponse;
        });

        it('should throw an exception for invalid Response instances', function () {
            var res = {};

            expect(res).to.not.be.a.postmanResponse;
            expect(function () {
                expect(res).to.be.a.postmanResponse;
            }).to.throw('expecting a postman response object but got {}');
        });

        it('should handle incorrect negated assertions correctly', function () {
            var res = new Response();

            expect(function () {
                expect(res).to.not.be.a.postmanResponse;
            }).to.throw('not expecting a postman response object');
        });
    });

    describe('.statusCode', function () {
        it('should assert status codes correctly', function () {
            expect(new Response({code: 102})).to.have.statusCode(102);
            expect(new Response({code: 202})).to.have.statusCode(202);
            expect(new Response({code: 302})).to.have.statusCode(302);
            expect(new Response({code: 402})).to.have.statusCode(402);
            expect(new Response({code: 502})).to.have.statusCode(502);
        });

        it('should handle negated assertions correctly', function () {
            expect(new Response({code: 102})).to.not.have.statusCode(101);
            expect(new Response({code: 202})).to.not.have.statusCode(201);
            expect(new Response({code: 302})).to.not.have.statusCode(301);
            expect(new Response({code: 402})).to.not.have.statusCode(401);
            expect(new Response({code: 502})).to.not.have.statusCode(501);
        });

        it('should detect incorrect numerical class assertions correctly', function () {
            expect(function () {
                expect(new Response({code: 102})).to.have.statusCode(202);
            }).to.throw('expected response to have status code 202 but got 102');
            expect(function () {
                expect(new Response({code: 202})).to.have.statusCode(302);
            }).to.throw('expected response to have status code 302 but got 202');
            expect(function () {
                expect(new Response({code: 302})).to.have.statusCode(402);
            }).to.throw('expected response to have status code 402 but got 302');
            expect(function () {
                expect(new Response({code: 402})).to.have.statusCode(502);
            }).to.throw('expected response to have status code 502 but got 402');
            expect(function () {
                expect(new Response({code: 502})).to.have.statusCode(102);
            }).to.throw('expected response to have status code 102 but got 502');
        });

        it('should detect incorrect negated numerical class assertions correctly', function () {
            expect(function () {
                expect(new Response({code: 102})).to.not.have.statusCode(102);
            }).to.throw('expected response to not have status code 102');
            expect(function () {
                expect(new Response({code: 202})).to.not.have.statusCode(202);
            }).to.throw('expected response to not have status code 202');
            expect(function () {
                expect(new Response({code: 302})).to.not.have.statusCode(302);
            }).to.throw('expected response to not have status code 302');
            expect(function () {
                expect(new Response({code: 402})).to.not.have.statusCode(402);
            }).to.throw('expected response to not have status code 402');
            expect(function () {
                expect(new Response({code: 502})).to.not.have.statusCode(502);
            }).to.throw('expected response to not have status code 502');
        });
    });

    describe('.statusCodeClass', function () {
        it('should assert numerical classes correctly', function () {
            expect(new Response({code: 102})).to.have.statusCodeClass(1);
            expect(new Response({code: 202})).to.have.statusCodeClass(2);
            expect(new Response({code: 302})).to.have.statusCodeClass(3);
            expect(new Response({code: 402})).to.have.statusCodeClass(4);
            expect(new Response({code: 502})).to.have.statusCodeClass(5);
        });

        it('should handle negated assertions correctly', function () {
            expect(new Response({code: 102})).to.not.have.statusCodeClass(2);
            expect(new Response({code: 202})).to.not.have.statusCodeClass(3);
            expect(new Response({code: 302})).to.not.have.statusCodeClass(4);
            expect(new Response({code: 402})).to.not.have.statusCodeClass(5);
            expect(new Response({code: 502})).to.not.have.statusCodeClass(1);
        });

        it('should detect incorrect numerical class assertions correctly', function () {
            expect(function () {
                expect(new Response({code: 102})).to.have.statusCodeClass(2);
            }).to.throw('expected response code to be 2XX but found 102');
            expect(function () {
                expect(new Response({code: 202})).to.have.statusCodeClass(3);
            }).to.throw('expected response code to be 3XX but found 202');
            expect(function () {
                expect(new Response({code: 302})).to.have.statusCodeClass(4);
            }).to.throw('expected response code to be 4XX but found 302');
            expect(function () {
                expect(new Response({code: 402})).to.have.statusCodeClass(5);
            }).to.throw('expected response code to be 5XX but found 402');
            expect(function () {
                expect(new Response({code: 502})).to.have.statusCodeClass(1);
            }).to.throw('expected response code to be 1XX but found 502');
        });

        it('should handle incorrect negated numerical class assertions correctly', function () {
            expect(function () {
                expect(new Response({code: 102})).to.not.have.statusCodeClass(1);
            }).to.throw('expected response code to not be 1XX');
            expect(function () {
                expect(new Response({code: 202})).to.not.have.statusCodeClass(2);
            }).to.throw('expected response code to not be 2XX');
            expect(function () {
                expect(new Response({code: 302})).to.not.have.statusCodeClass(3);
            }).to.throw('expected response code to not be 3XX');
            expect(function () {
                expect(new Response({code: 402})).to.not.have.statusCodeClass(4);
            }).to.throw('expected response code to not be 4XX');
            expect(function () {
                expect(new Response({code: 502})).to.not.have.statusCodeClass(5);
            }).to.throw('expected response code to not be 5XX');
        });
    });

    describe('status class', function () {
        it('should assert literal classes correctly', function () {
            expect(new Response({code: 101})).to.be.info;
            expect(new Response({code: 200})).to.be.ok;
            expect(new Response({code: 201})).to.be.success;
            expect(new Response({code: 301})).to.be.redirection;
            expect(new Response({code: 401})).to.be.clientError;
            expect(new Response({code: 501})).to.be.serverError;
            expect(new Response({code: 501})).to.be.error;
            expect(new Response({code: 401})).to.be.error;
        });

        it('should handle negated assertions correctly', function () {
            expect(new Response({code: 101})).not.to.be.success;
            expect(new Response({code: 200})).not.to.be.info;
            expect(new Response({code: 201})).not.to.be.redirection;
            expect(new Response({code: 301})).not.to.be.clientError;
            expect(new Response({code: 401})).to.not.be.serverError;
            expect(new Response({code: 501})).to.not.be.info;
        });

        it('should handle incorrect assertions correctly', function () {
            expect(function () {
                expect(new Response({code: 101})).to.be.ok;
            }).to.throw('expected response to have status reason \'OK\' but got \'SWITCHING PROTOCOLS\'');
            expect(function () {
                expect(new Response({code: 200})).to.be.error;
            }).to.throw('expected response code to be 4XX or 5XX but found 200');
            expect(function () {
                expect(new Response({code: 201})).to.be.redirection;
            }).to.throw('expected response code to be 3XX but found 201');
            expect(function () {
                expect(new Response({code: 301})).to.be.clientError;
            }).to.throw('expected response code to be 4XX but found 301');
            expect(function () {
                expect(new Response({code: 401})).to.be.serverError;
            }).to.throw('expected response code to be 5XX but found 401');
            expect(function () {
                expect(new Response({code: 501})).to.be.info;
            }).to.throw('expected response code to be 1XX but found 501');
        });

        it('should handle incorrect negated assertions correctly', function () {
            expect(function () {
                expect(new Response({code: 101})).to.not.be.info;
            }).to.throw('expected response code to not be 1XX');
            expect(function () {
                expect(new Response({code: 200})).to.not.be.ok;
            }).to.throw('expected response to not have status reason \'OK\'');
            expect(function () {
                expect(new Response({code: 201})).to.not.be.success;
            }).to.throw('expected response code to not be 2XX');
            expect(function () {
                expect(new Response({code: 301})).to.not.be.redirection;
            }).to.throw('expected response code to not be 3XX');
            expect(function () {
                expect(new Response({code: 401})).to.not.be.clientError;
            }).to.throw('expected response code to not be 4XX');
            expect(function () {
                expect(new Response({code: 501})).to.not.be.serverError;
            }).to.throw('expected response code to not be 5XX');
        });

        it('should use the inbuilt ok assertion for non sdk Response arguments', function () {
            expect({}).ok;
            expect(1).to.be.ok;

            expect(0).to.not.be.ok;
            expect(null).to.not.be.ok;
        });
    });

    describe('status code reasons', function () {
        it('should be asserted correctly', function () {
            expect(new Response({ code: 200 })).to.be.ok;
            expect(new Response({ code: 202 })).to.be.accepted;
            expect(new Response({ code: 204 })).to.be.withoutContent;
            expect(new Response({ code: 401 })).to.be.unauthorized;
            expect(new Response({ code: 403 })).to.be.forbidden;
            expect(new Response({ code: 404 })).to.be.notFound;
        });

        it('should handle negated assertions correctly', function () {
            expect(new Response({ code: 200 })).to.not.be.accepted;
            expect(new Response({ code: 202 })).to.not.be.unauthorized;
            expect(new Response({ code: 204 })).to.not.be.rateLimited;
            expect(new Response({ code: 401 })).to.not.be.forbidden;
            expect(new Response({ code: 403 })).to.not.be.ok;
            expect(new Response({ code: 400 })).to.not.be.notFound;
        });

        it('should handle incorrect assertions correctly', function () {
            expect(function () {
                expect(new Response({ code: 200 })).to.be.accepted;
            }).to.throw('expected response to have status reason \'ACCEPTED\' but got \'OK\'');
            expect(function () {
                expect(new Response({ code: 202 })).to.be.unauthorized;
            }).to.throw('expected response to have status reason \'UNAUTHORIZED\' but got \'ACCEPTED\'');
            expect(function () {
                expect(new Response({ code: 204 })).to.be.rateLimited;
            }).to.throw('expected response to have status reason \'TOO MANY REQUESTS\' but got \'NO CONTENT\'');
            expect(function () {
                expect(new Response({ code: 401 })).to.be.forbidden;
            }).to.throw('expected response to have status reason \'FORBIDDEN\' but got \'UNAUTHORIZED\'');
            expect(function () {
                expect(new Response({ code: 403 })).to.be.ok;
            }).to.throw('expected response to have status reason \'OK\' but got \'FORBIDDEN\'');
            expect(function () {
                expect(new Response({ code: 404 })).to.be.ok;
            }).to.throw('expected response to have status reason \'OK\' but got \'NOT FOUND\'');
        });

        it('should handle negated incorrect assertions correctly', function () {
            expect(function () {
                expect(new Response({ code: 200 })).to.not.be.ok;
            }).to.throw('expected response to not have status reason \'OK\'');
            expect(function () {
                expect(new Response({ code: 202 })).to.not.be.accepted;
            }).to.throw('expected response to not have status reason \'ACCEPTED\'');
            expect(function () {
                expect(new Response({ code: 401 })).to.not.be.unauthorized;
            }).to.throw('expected response to not have status reason \'UNAUTHORIZED\'');
            expect(function () {
                expect(new Response({ code: 403 })).to.not.be.forbidden;
            }).to.throw('expected response to not have status reason \'FORBIDDEN\'');
            expect(function () {
                expect(new Response({ code: 404 })).to.not.be.notFound;
            }).to.throw('expected response to not have status reason \'NOT FOUND\'');
        });
    });

    describe('status reasons', function () {
        it('should assert status reasons correctly', function () {
            expect(new Response({code: 200})).to.have.statusReason('OK');
            expect(new Response({code: 204})).to.have.statusReason('No Content');
            expect(new Response({code: 400})).to.have.statusReason('Bad Request');
            expect(new Response({code: 401})).to.have.statusReason('Unauthorized');
            expect(new Response({code: 403})).to.have.statusReason('Forbidden');
            expect(new Response({code: 404})).to.have.statusReason('Not Found');
            expect(new Response({code: 406})).to.have.statusReason('Not Acceptable');
            expect(new Response({code: 429})).to.have.statusReason('Too Many Requests');
        });

        it('should handle negated assertions correctly', function () {
            expect(new Response({code: 200})).to.not.have.statusReason('No Content');
            expect(new Response({code: 204})).to.not.have.statusReason('Bad Request');
            expect(new Response({code: 400})).to.not.have.statusReason('Unauthorized');
            expect(new Response({code: 401})).to.not.have.statusReason('Forbidden');
            expect(new Response({code: 403})).to.not.have.statusReason('Not Found');
            expect(new Response({code: 404})).to.not.have.statusReason('Not Acceptable');
            expect(new Response({code: 406})).to.not.have.statusReason('Too Many Requests');
            expect(new Response({code: 429})).to.not.have.statusReason('OK');
        });

        it('should handle incorrect assertions for status reasons correctly', function () {
            expect(function () {
                expect(new Response({code: 200})).to.have.statusReason('No Content');
            }).to.throw('expected response to have status reason \'No Content\' but got \'OK\'');
            expect(function () {
                expect(new Response({code: 204})).to.have.statusReason('Bad Request');
            }).to.throw('expected response to have status reason \'Bad Request\' but got \'No Content\'');
            expect(function () {
                expect(new Response({code: 400})).to.have.statusReason('Unauthorized');
            }).to.throw('expected response to have status reason \'Unauthorized\' but got \'Bad Request\'');
            expect(function () {
                expect(new Response({code: 401})).to.have.statusReason('Forbidden');
            }).to.throw('expected response to have status reason \'Forbidden\' but got \'Unauthorized\'');
            expect(function () {
                expect(new Response({code: 403})).to.have.statusReason('Not Found');
            }).to.throw('expected response to have status reason \'Not Found\' but got \'Forbidden\'');
            expect(function () {
                expect(new Response({code: 404})).to.have.statusReason('Not Acceptable');
            }).to.throw('expected response to have status reason \'Not Acceptable\' but got \'Not Found\'');
            expect(function () {
                expect(new Response({code: 406})).to.have.statusReason('Too Many Requests');
            }).to.throw('expected response to have status reason \'Too Many Requests\' but got \'Not Acceptable\'');
            expect(function () {
                expect(new Response({code: 429})).to.have.statusReason('OK');
            }).to.throw('expected response to have status reason \'OK\' but got \'Too Many Requests\'');
        });

        it('should handle incorrect negated assertions for status reasons correctly', function () {
            expect(function () {
                expect(new Response({code: 200})).to.not.have.statusReason('OK');
            }).to.throw('expected response to not have status reason \'OK\'');
            expect(function () {
                expect(new Response({code: 204})).to.not.have.statusReason('No Content');
            }).to.throw('expected response to not have status reason \'No Content\'');
            expect(function () {
                expect(new Response({code: 400})).to.not.have.statusReason('Bad Request');
            }).to.throw('expected response to not have status reason \'Bad Request\'');
            expect(function () {
                expect(new Response({code: 401})).to.not.have.statusReason('Unauthorized');
            }).to.throw('expected response to not have status reason \'Unauthorized\'');
            expect(function () {
                expect(new Response({code: 403})).to.not.have.statusReason('Forbidden');
            }).to.throw('expected response to not have status reason \'Forbidden\'');
            expect(function () {
                expect(new Response({code: 404})).to.not.have.statusReason('Not Found');
            }).to.throw('expected response to not have status reason \'Not Found\'');
            expect(function () {
                expect(new Response({code: 406})).to.not.have.statusReason('Not Acceptable');
            }).to.throw('expected response to not have status reason \'Not Acceptable\'');
            expect(function () {
                expect(new Response({code: 429})).to.not.have.statusReason('Too Many Requests');
            }).to.throw('expected response to not have status reason \'Too Many Requests\'');
        });
    });

    describe('.status', function () {
        it('should assert status correctly', function () {
            expect(new Response({code: 200})).to.have.status('OK');
            expect(new Response({code: 204})).to.have.status('No Content');
            expect(new Response({code: 400})).to.have.status('Bad Request');
            expect(new Response({code: 401})).to.have.status('Unauthorized');
            expect(new Response({code: 403})).to.have.status('Forbidden');
            expect(new Response({code: 404})).to.have.status('Not Found');
            expect(new Response({code: 406})).to.have.status('Not Acceptable');
            expect(new Response({code: 429})).to.have.status('Too Many Requests');
        });

        it('should handle response codes correctly', function () {
            expect(new Response({code: 200})).to.have.status(200);
            expect(new Response({code: 204})).to.have.status(204);
            expect(new Response({code: 400})).to.have.status(400);
            expect(new Response({code: 401})).to.have.status(401);
            expect(new Response({code: 403})).to.have.status(403);
            expect(new Response({code: 404})).to.have.status(404);
            expect(new Response({code: 406})).to.have.status(406);
            expect(new Response({code: 429})).to.have.status(429);
        });

        it('should handle negative assertions correctly', function () {
            expect(new Response({code: 200})).to.not.have.status('No Content');
            expect(new Response({code: 204})).to.not.have.status('Bad Request');
            expect(new Response({code: 400})).to.not.have.status('Unauthorized');
            expect(new Response({code: 401})).to.not.have.status('Forbidden');
            expect(new Response({code: 403})).to.not.have.status('Not Found');
            expect(new Response({code: 404})).to.not.have.status('Not Acceptable');
            expect(new Response({code: 406})).to.not.have.status('Too Many Requests');
            expect(new Response({code: 429})).to.not.have.status('OK');
        });

        it('should handle incorrect assertions for status code reasons correctly', function () {
            expect(function () {
                expect(new Response({code: 200})).to.have.status('No Content');
            }).to.throw('expected response to have status reason \'No Content\' but got \'OK\'');
            expect(function () {
                expect(new Response({code: 204})).to.have.status('Bad Request');
            }).to.throw('expected response to have status reason \'Bad Request\' but got \'No Content\'');
            expect(function () {
                expect(new Response({code: 400})).to.have.status('Unauthorized');
            }).to.throw('expected response to have status reason \'Unauthorized\' but got \'Bad Request\'');
            expect(function () {
                expect(new Response({code: 401})).to.have.status('Forbidden');
            }).to.throw('expected response to have status reason \'Forbidden\' but got \'Unauthorized\'');
            expect(function () {
                expect(new Response({code: 403})).to.have.status('Not Found');
            }).to.throw('expected response to have status reason \'Not Found\' but got \'Forbidden\'');
            expect(function () {
                expect(new Response({code: 404})).to.have.status('Not Acceptable');
            }).to.throw('expected response to have status reason \'Not Acceptable\' but got \'Not Found\'');
            expect(function () {
                expect(new Response({code: 406})).to.have.status('Too Many Requests');
            }).to.throw('expected response to have status reason \'Too Many Requests\' but got \'Not Acceptable\'');
            expect(function () {
                expect(new Response({code: 429})).to.have.status('OK');
            }).to.throw('expected response to have status reason \'OK\' but got \'Too Many Requests\'');
        });
    });

    describe('.header', function () {
        it('should not throw an error for valid header states', function () {
            var res = new Response({
                header: [{ key: 'Content-Type', value: 'application/json; charset=utf-8' }]
            });

            expect(res).to.have.header('Content-Type', 'application/json; charset=utf-8');
        });

        it.skip('should handle negated value assertions correctly', function () {
            var res = new Response({
                header: [{ key: 'Content-Type', value: 'application/json; charset=utf-8' }]
            });

            expect(res).to.not.have.header('Content-Type', 'application/xml');
        });

        it('should handle negated assertions correctly', function () {
            var res = new Response({
                header: [{ key: 'Content-Type', value: 'application/json; charset=utf-8' }]
            });

            expect(res).to.not.have.header('Cache-Control');
        });

        it('should throw an error for invalid header states', function () {
            var res = new Response({
                header: [{ key: 'Content-Type', value: 'application/json; charset=utf-8' }]
            });

            expect(function () {
                expect(res).to.have.header('Content-Type', 'application/xml');
            // eslint-disable-next-line max-len
            }).to.throw('expected \'Content-Type\' response header to be \'application/xml\' but got \'application/json; charset=utf-8\'');
        });
    });

    describe('.withBody', function () {
        it('should not throw an error for valid body assertions', function () {
            var res = new Response({ body: 'Res Body' });

            expect(res).to.be.withBody;
        });

        it('should handle negated assertions correctly', function () {
            var res = new Response();

            expect(res).to.not.be.withBody;
        });

        it('should throw an error for invalid body states', function () {
            var res = new Response();

            expect(function () {
                expect(res).to.be.withBody;
            }).to.throw('expected response to have content in body');
        });
    });

    describe('.json', function () {
        it('should assert valid JSON bodies correctly', function () {
            var res = new Response({ body: '{"a": 1}' });

            expect(res).to.be.json;
        });

        it('should handle negated assertions correctly', function () {
            var res = new Response({ body: '<a>1</a>' });

            expect(res).to.not.be.json;
        });

        it('should handle incorrect assertions correctly', function () {
            var res = new Response({ body: '<a>1</a>' });

            expect(function () {
                expect(res).to.be.json;
            }).to.throw('expected response body to be a valid json but got error Unexpected token \'<\' at 1:1');
        });

        it('should handle incorrect negated assertions correctly', function () {
            var res = new Response({ body: '{"a": 1}' });

            expect(function () {
                expect(res).to.not.be.json;
            }).to.throw('expected response body not to be a valid json');
        });
    });

    describe('.body', function () {
        describe('presence', function () {
            it('should assert the presence of bodies correctly', function () {
                var res = new Response({ body: '{"a": 1}' });

                expect(res).to.have.body;
            });

            it('should handle negated assertions correctly', function () {
                var res = new Response();

                expect(res).to.not.have.body;
            });

            it.skip('should handle incorrect assertions correctly', function () {
                var res = new Response();

                expect(function () {
                    expect(res).to.have.body;
                }).to.throw('expected response to have body');
            });

            it('should handle incorrect negated assertions correctly', function () {
                var res = new Response({ body: '{"a": 1}' });

                expect(function () {
                    expect(res).to.not.have.body('{"a": 1}');
                }).to.throw('expected response body to not equal \'{"a": 1}\'');
            });
        });

        describe('pattern', function () {
            it('should assert body patterns correctly', function () {
                var res = new Response({ body: 'a' });

                expect(res).to.have.body(/a/);
            });

            it('should handle negated assertions correctly', function () {
                var res = new Response({ body: 'a' });

                expect(res).to.not.have.body(/b/);
            });

            it('should handle incorrect assertions correctly', function () {
                var res = new Response({ body: 'a' });

                expect(function () {
                    expect(res).to.have.body(/b/);
                }).to.throw('expected response body text to match /b/ but got \'a\'');
            });

            it('should handle incorrect negated assertions correctly', function () {
                var res = new Response({ body: 'a' });

                expect(function () {
                    expect(res).to.not.have.body(/a/);
                }).to.throw('expected response body text \'a\' to not match /a/');
            });
        });

        describe('literal comparisons', function () {
            it('should assert nested bodies correctly', function () {
                var res = new Response({ body: 'a' });

                expect(res).to.have.body('a');
            });

            it('should handle negated assertions correctly', function () {
                var res = new Response({ body: 'a' });

                expect(res).to.not.have.body('b');
            });

            it('should handle incorrect assertions correctly', function () {
                var res = new Response({ body: 'a' });

                expect(function () {
                    expect(res).to.have.body('b');
                }).to.throw('expected response body to equal \'b\' but got \'a\'');
            });

            it('should handle incorrect negated assertions correctly', function () {
                var res = new Response({ body: 'a' });

                expect(function () {
                    expect(res).to.not.have.body('a');
                }).to.throw('expected response body to not equal \'a\'');
            });
        });

        describe('object', function () {
            it.skip('should assert nested bodies correctly', function () {
                var res = new Response({ body: { a: 1 } });

                expect(res).to.have.body({ a: 1 });
            });

            it('should handle negated assertions correctly', function () {
                var res = new Response({ body: { a: 1 } });

                expect(res).to.not.have.body({ a: 0 });
            });

            it.skip('should handle incorrect assertions correctly', function () {
                var res = new Response({ body: { a: 1 } });

                expect(function () {
                    expect(res).to.have.body({ a: 0 });
                }).to.throw('expected response body to equal \'b\' but got \'a\'');
            });

            it.skip('should handle incorrect negated assertions correctly', function () {
                var res = new Response({ body: { a: 1 } });

                expect(function () {
                    expect(res).to.not.have.body({ a: 1 });
                }).to.throw('expected response body to not equal \'a\'');
            });
        });
    });

    describe('.jsonBody', function () {
        describe('presence', function () {
            it('should assert the presence of json bodies correctly', function () {
                var res = new Response({ body: '{"a": 1}' });

                expect(res).to.have.jsonBody;
            });

            it('should handle negated assertions correctly', function () {
                var res = new Response();

                expect(res).to.not.have.jsonBody;
            });

            it.skip('should handle incorrect assertions correctly', function () {
                var res = new Response();

                expect(function () {
                    expect(res).to.have.jsonBody;
                }).to.throw('expected response to have json body');
            });

            it('should handle incorrect negated assertions correctly', function () {
                var res = new Response({ body: '{"a": 1}' });

                expect(function () {
                    expect(res).to.not.have.jsonBody();
                }).to.throw('expected response body not to be a valid json');
            });
        });

        describe('comparison', function () {
            it('should assert the validity of json bodies correctly', function () {
                var res = new Response({ body: '{"a": 1}' });

                expect(res).to.have.jsonBody({ a: 1 });
            });

            it('should handle negated assertions correctly', function () {
                var res = new Response();

                expect(res).to.not.have.jsonBody({ a: 1 });
            });

            it.skip('should handle incorrect assertions correctly', function () {
                var res = new Response();

                expect(function () {
                    expect(res).to.have.jsonBody({ a: 1 });
                }).to.throw('expected response to have json body');
            });

            it.skip('should handle incorrect negated assertions correctly', function () {
                var res = new Response({ body: '{"a": 1}' });

                expect(function () {
                    expect(res).to.not.have.jsonBody({ a: 1 });
                }).to.throw('expected response body not to be a valid json');
            });
        });

        describe('paths', function () {
            it('should assert the validity of json bodies correctly', function () {
                var res = new Response({ body: '{"a": 1}' });

                expect(res).to.have.jsonBody('a', 1);
            });

            it('should assert the existence of a path correctly', function () {
                var res = new Response({ body: '{"a": 1}' });

                expect(res).to.have.jsonBody('a');
            });

            it('should assert the absence of paths correctly', function () {
                var res = new Response({ body: '{"a": 1}' });

                expect(res).to.not.have.jsonBody('b');
            });

            it('should handle negated assertions correctly', function () {
                var res = new Response();

                expect(res).to.not.have.jsonBody('a', 1);
            });

            it('should handle incorrect assertions correctly', function () {
                var res = new Response();

                expect(function () {
                    expect(res).to.have.jsonBody('a', 1);
                }).to.throw('expected undefined in response to contain property \'a\'');
            });

            it('should handle incorrect negated assertions correctly', function () {
                var res = new Response({ body: '{"a": 1}' });

                expect(function () {
                    expect(res).to.not.have.jsonBody('a', 1);
                }).to.throw('expected { a: 1 } in response to not contain property \'a\'');
            });
        });
    });

    describe('.responseTime', function () {
        it('should assert the validity of response times correctly', function () {
            var res = new Response({ responseTime: 123 });

            expect(res).to.have.responseTime(123);
        });

        it('should handle range comparisons correctly', function () {
            var res = new Response({ responseTime: 123 });

            expect(res).to.have.responseTime.above(100);
            expect(res).to.have.responseTime.below(150);
            expect(res).to.have.responseTime.within(100, 150);
        });

        it('should handle incorrect assertions correctly', function () {
            var res = new Response();

            expect(function () {
                expect(res).to.have.responseTime(123);
            }).to.throw('expected { Object (id, _details, ...) } to have property \'responseTime\'');
        });

        it('should handle incorrect negated assertions correctly', function () {
            var res = new Response({ responseTime: 123 });

            expect(function () {
                expect(res).to.not.have.responseTime(123);
            }).to.throw('expected response to not have a valid response time but got 123');
        });
    });

    describe('.responseSize', function () {
        it('should assert the validity of response times correctly', function () {
            var res = new Response({ body: '123', header: [{key: 'foo', value: 'bar'}] });

            expect(res).to.have.responseSize(45);
        });

        it('should handle range comparisons correctly', function () {
            var res = new Response({ body: '123' });

            expect(res).to.have.responseSize.above(30);
            expect(res).to.have.responseSize.below(100);
            expect(res).to.have.responseSize.within(30, 100);
        });

        it('should handle missing data correctly', function () {
            var res = new Response();

            expect(res).to.have.responseSize(30);
        });

        it.skip('should handle negated assertions correctly', function () {
            var res = new Response();

            expect(res).to.not.have.responseSize(123);
        });

        it('should handle incorrect assertions correctly', function () {
            var res = new Response();

            expect(function () {
                expect(res).to.have.responseSize(123);
            }).to.throw('expected response size to equal 30 but got 123');
        });

        it('should handle incorrect negated assertions correctly', function () {
            var res = new Response({ body: '123', header: [{key: 'foo', value: 'bar'}] });

            expect(function () {
                expect(res).to.not.have.responseSize(123);
            }).to.throw('expected response to not have a valid response size but got 45');
        });
    });

    describe('.jsonSchema', function () {
        var schema = {
            $schema: 'http://json-schema.org/draft-07/schema#',
            required: ['alpha'],
            additionalProperties: false,
            properties: {
                alpha: { type: 'boolean' },
                beta: { type: 'boolean' }
            }
        };

        it('should assert the data with valid schema correctly', function () {
            expect({alpha: true}).to.have.jsonSchema(schema);
        });

        it('should handle incorrect assertions correctly', function () {
            expect(function () {
                expect({random: 123}).to.have.jsonSchema(schema);
            }).to.throw('expected data to satisfy schema but found following errors: \n' +
                'data should NOT have additional properties, data should have required property \'alpha\''
            );
        });

        it('should handle negated assertions correctly', function () {
            expect({alpha: 123}).to.not.have.jsonSchema(schema);
        });

        it('should handle incorrect negated assertions correctly', function () {
            expect(function () {
                expect({alpha: true}).to.not.have.jsonSchema(schema);
            }).to.throw('expected data to not satisfy schema');
        });

        it('should override default schema validator options', function () {
            expect(function () {
                expect({beta: 123, alpha: 123}).to.have.jsonSchema(schema, {allErrors: false});
            }).to.throw('expected data to satisfy schema but found following errors: \n' +
                'data.alpha should be boolean'
            );
        });

        it('should auto parse JSON for PostmanResponse & PostmanRequest instance', function () {
            var response = new Response({ body: '{"alpha": false}' });

            expect(response).to.have.jsonSchema(schema);
        });

        it('should not auto parse JSON if `json` method exists', function () {
            var obj = {
                    alpha: true,
                    json: function () {
                        return {
                            alpha: 123
                        };
                    }
                },
                schema = {
                    properties: {
                        alpha: {
                            type: 'boolean'
                        }
                    }
                };

            expect(obj).to.have.jsonSchema(schema);
        });
    });
});
