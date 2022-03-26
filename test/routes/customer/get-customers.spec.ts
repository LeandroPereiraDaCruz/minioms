import { expect } from "chai";
import { NOT_FOUND, OK } from "http-status";
import { chai, server } from "../../index.spec";
import jsonSchemaError from './__SCHEMA__/jsonSchemaError.json';

describe("Route GET /v1/customers", function () {
  it("Returns HTTP status code 200 when call getCustomers", function (done) {
    chai
      .request(server)
      .get("/v1/customers")
      .end((err, res) => {
        expect(res).to.have.status(OK);
        expect(res.body).to.be.an("object");
        expect(res.body.records).to.be.an("array");
        
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
  it("Returns HTTP status code 404 when call getCustomers", function (done) {
    chai
      .request(server)
      .get("/v1/customers")
      .end((err, res) => {
        expect(res).to.have.status(NOT_FOUND);

        expect(res.body).to.be.jsonSchema(jsonSchemaError);
        expect(res.body).to.have.property('statusCode', 400);
        expect(res.body).to.have.property('error', 'Bad Request');
        expect(res.body).to.have.property('message', 'Validation failed');
        expect(res.body.validation.body).to.have.property('source', 'body');
        done();
      });
  });
});