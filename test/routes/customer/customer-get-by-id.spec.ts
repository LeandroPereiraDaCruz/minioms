import { expect, should } from 'chai';
import { BAD_REQUEST, CONFLICT, CREATED, OK, NOT_FOUND } from 'http-status';
import { chai, server } from '../../index.spec';
import jsonSchemaErrorGet from './__SCHEMA__/errors/jsonSchemaErrorGetById.json';
import jsonSchemaSuccessGetById from './__SCHEMA__/success/jsonSchemaSuccessGetById.json';
// https://www.jsonschema.net/home

describe('Route GET /v1/customers/:uuid', function() {
	it('Return HTTP status Code 400 when ID is less than 36 characters', (done) => {
	        chai.request(server)
	            .get('/v1/customers/123')
	            .send({uuid: '123'})
	            .end((err, res) => {
	            	expect(res).to.have.status(BAD_REQUEST);
	                should().exist(res.body);
	                expect(res.body).to.be.jsonSchema(jsonSchemaErrorGet);
	                expect(res.body).to.be.have.property('statusCode', BAD_REQUEST);
	                expect(res.body).to.be.have.property('error', 'Bad Request');
	                expect(res.body).to.be.have.property('message', 'Validation failed');
	                should().exist(res.body.validation.params);
	                expect(res.body.validation.params.keys).to.be.an('array').with.length(1);
	                expect(res.body.validation.params.keys[0]).to.be.equal('uuid');
	                expect(res.body.validation.params).to.be.have.property('message', '"uuid" length must be 36 characters long');
	                done();
	            });
	    });

	it('Return HTTP status Code 400 when ID is longer than 36 characters', (done) => {
	        chai.request(server)
	            .get('/v1/customers/27456bb4-d1f2-4e88-a546-7eeb2eaa1f6b1')
	            .send({uuid: '27456bb4-d1f2-4e88-a546-7eeb2eaa1f6b1'})
	            .end((err, res) => {
	            	expect(res).to.have.status(BAD_REQUEST);
	                should().exist(res.body);
	                expect(res.body).to.be.jsonSchema(jsonSchemaErrorGet);
	                expect(res.body).to.be.have.property('statusCode', BAD_REQUEST);
	                expect(res.body).to.be.have.property('error', 'Bad Request');
	                expect(res.body).to.be.have.property('message', 'Validation failed');
	                should().exist(res.body.validation.params);
	                expect(res.body.validation.params.keys).to.be.an('array').with.length(1);
	                expect(res.body.validation.params.keys[0]).to.be.equal('uuid');
	                expect(res.body.validation.params).to.be.have.property('message', '"uuid" length must be 36 characters long');
	                done();
	            });
	    });

	it('Return HTTP status Code 404 when ID is not found', (done) => {
	        chai.request(server)
	            .get('/v1/customers/27456bb4-d1f2-4e88-a546-7eeb2eaa1f2b')
	            .send({uuid: '27456bb4-d1f2-4e88-a546-7eeb2eaa1f2b'})
	            .end((err, res) => {
	            	expect(res).to.have.status(NOT_FOUND);
	                should().exist(res.body);
	                expect(res.body).to.be.jsonSchema(jsonSchemaErrorGet);
	                expect(res.body).to.be.have.property('statusCode', 404);
	                expect(res.body).to.be.have.property('error', 'Not Found');
	                expect(res.body).to.be.have.property('message', 'Validation failed');
	                should().exist(res.body.validation.params);
	                expect(res.body.validation.params).to.be.have.property('message', 'Customer Not Found!');
	                done();
	            });
	    });

	it('Return HTTP status Code 200 when find by ID', (done) => {
	        chai.request(server)
	            .get('/v1/customers/27456bb4-d1f2-4e88-a546-7eeb2eaa1f6b')
	            .end((err, res) => {
	                expect(res).to.have.status(OK);
	                should().exist(res.body);
	                expect(res.body).to.be.jsonSchema(jsonSchemaSuccessGetById);
	                done();
	            });
	    });

});