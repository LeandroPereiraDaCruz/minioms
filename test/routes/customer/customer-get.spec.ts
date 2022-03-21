import { expect, should } from 'chai';
import { BAD_REQUEST, CONFLICT, CREATED, OK, NOT_FOUND } from 'http-status';
import { chai, server } from '../../index.spec';
import jsonSchemaErrorGet from './__SCHEMA__/errors/jsonSchemaErrorGet.json';
import jsonSchemaErrorGetQuery from './__SCHEMA__/errors/jsonSchemaErrorGetById.json';
import jsonSchemaSuccessGet from './__SCHEMA__/success/jsonSchemaSuccessGet.json';

// https://www.jsonschema.net/home
describe('Route GET /v1/customers/', function() {

	it('Return HTTP status code 200 when success', (done) => {
	        chai.request(server)
	            .get('/v1/customers/')
	            .end((err, res) => {
	                expect(res).to.have.status(OK);
	                should().exist(res.body);
	                done();
	            });
	    });

	it('Return HTTP status code 200 when Offset is informed', (done) => {
	        chai.request(server)
	            .get('/v1/customers?offset=1')
	            .end((err, res) => {
	                expect(res).to.have.status(OK);
	                should().exist(res.body);
	                done();
	            });
	    });

	it('Return HTTP status code 200 when limit is informed', (done) => {
	        chai.request(server)
	            .get('/v1/customers?limit=1')
	            .end((err, res) => {
	                expect(res).to.have.status(OK);
	                should().exist(res.body);
	                done();
	            });
	    });

	it('Return HTTP status code 200 when Offset and Limit are informed', (done) => {
	        chai.request(server)
	            .get('/v1/customers?limit=2&offset=1')
	            .end((err, res) => {
	                expect(res).to.have.status(OK);
	                should().exist(res.body);
	                done();
	            });
	    });

	it('Return HTTP status code 400 when Limit is not a number', (done) => {
	        chai.request(server)
	            .get('/v1/customers?limit=1a')
	            .end((err, res) => {
	            	expect(res).to.have.status(BAD_REQUEST);
	                should().exist(res.body);
	                expect(res.body).to.be.jsonSchema(jsonSchemaErrorGet);
	                expect(res.body).to.be.have.property('statusCode', BAD_REQUEST);
	                expect(res.body).to.be.have.property('error', 'Bad Request');
	                expect(res.body).to.be.have.property('message', 'Validation failed');
	                should().exist(res.body.validation.query);
	                expect(res.body.validation.query.keys).to.be.an('array').with.length(1);
	                expect(res.body.validation.query.keys[0]).to.be.equal('limit');
	                expect(res.body.validation.query).to.be.have.property('message', '"limit" must be a number');
	                done();
	            });
	    });

	it('Return HTTP status code 400 when Limit is less to 1', (done) => {
	        chai.request(server)
	            .get('/v1/customers?limit=0')
	            .end((err, res) => {
	            	expect(res).to.have.status(BAD_REQUEST);
	                should().exist(res.body);
	                expect(res.body).to.be.jsonSchema(jsonSchemaErrorGet);
	                expect(res.body).to.be.have.property('statusCode', BAD_REQUEST);
	                expect(res.body).to.be.have.property('error', 'Bad Request');
	                expect(res.body).to.be.have.property('message', 'Validation failed');
	                should().exist(res.body.validation.query);
	                expect(res.body.validation.query.keys).to.be.an('array').with.length(1);
	                expect(res.body.validation.query.keys[0]).to.be.equal('limit');
	                expect(res.body.validation.query).to.be.have.property('message', '"limit" must be greater than or equal to 1');
	                done();
	            });
	    });

	it('Return HTTP status code 400 when Offset is not a number', (done) => {
	        chai.request(server)
	            .get('/v1/customers?offset=1a')
	            .end((err, res) => {
	            	expect(res).to.have.status(BAD_REQUEST);
	                should().exist(res.body);
	                expect(res.body).to.be.jsonSchema(jsonSchemaErrorGet);
	                expect(res.body).to.be.have.property('statusCode', BAD_REQUEST);
	                expect(res.body).to.be.have.property('error', 'Bad Request');
	                expect(res.body).to.be.have.property('message', 'Validation failed');
	                should().exist(res.body.validation.query);
	                expect(res.body.validation.query.keys).to.be.an('array').with.length(1);
	                expect(res.body.validation.query.keys[0]).to.be.equal('offset');
	                expect(res.body.validation.query).to.be.have.property('message', '"offset" must be a number');
	                done();
	            });
	    });

	it('Return HTTP status code 404 when Offset exceeds the number of records', (done) => {
	        chai.request(server)
	            .get('/v1/customers?limit=2&offset=6')
	            .end((err, res) => {
	            	expect(res).to.have.status(NOT_FOUND);
	                should().exist(res.body);
	                expect(res.body).to.be.jsonSchema(jsonSchemaErrorGetQuery);
	                expect(res.body).to.be.have.property('statusCode', 404);
	                expect(res.body).to.be.have.property('error', 'Not Found');
	                expect(res.body).to.be.have.property('message', 'Validation failed');
	                should().exist(res.body.validation.params);
	                expect(res.body.validation.params).to.be.have.property('message', 'Customers Not Found!');
	                done();
	            });
	    });
	
});