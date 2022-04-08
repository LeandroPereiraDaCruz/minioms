import { expect, should } from "chai";
import { BAD_REQUEST, NOT_FOUND, OK } from "http-status";
import { chai, server } from "../../index.spec";


describe('Route GET /v1/customers/:id', function () {
  it('Return Http Status Code 200 when found customer', (done) => {
    chai.request(server)
      .get('/v1/customers/27456bb4-d1f2-4e88-a546-7eeb2eaa1f6b')
      .end((err, res) => {
        expect(res).to.have.status(OK);
        should().exist(res.body);
        expect(res.body).to.be.an("object");
        expect(res.body.records).to.be.an("array");
        expect(res.body.records).to.be.length(1);
        expect(res.body.records[0].uuid).to.be.equal("27456bb4-d1f2-4e88-a546-7eeb2eaa1f6b");
        expect(res.body.records[0]).to.be.an("object");
        expect(res.body.records[0]).to.have.property("uuid");
        expect(res.body.records[0]).to.have.property("name");
        expect(res.body.records[0]).to.have.property("contact");
        expect(res.body.records[0]).to.have.property("document");
        expect(res.body.records[0]).to.have.property("createdAt");
        expect(res.body.records[0]).to.have.property("updatedAt");
        done();
      });
  });

  it('Return Http Status Code 404 when not found customer', (done) => {
    chai.request(server)
      .get('/v1/customers/27456bb4-d1f2-4e88-a546-7eeb2eaa1f6c')
      .end((err, res) => {
        expect(res).to.have.status(NOT_FOUND);
        should().exist(res.body);
        expect(res.body).to.be.empty;
        done();
      });
  });

  it('Return Http Status Code 400 when uuid customer is invalid', (done) => {
    chai.request(server)
      .get('/v1/customers/test')
      .end((err, res) => {
        expect(res).to.have.status(BAD_REQUEST);
        should().exist(res.body);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("error");
        expect(res.body).to.have.property("message");
        expect(res.body).to.have.property("validation");
        expect(res.body.validation).to.have.property("params");
        expect(res.body.validation.params).to.have.property("source");
        expect(res.body.validation.params).to.have.property("keys");
        expect(res.body.validation.params.keys).to.be.an("array");
        expect(res.body.validation.params.keys[0]).to.be.equal("id");
        expect(res.body.validation.params).to.have.property(
          "message",
          '"id" must be a valid GUID'
        );
        done();
      });
  });
});