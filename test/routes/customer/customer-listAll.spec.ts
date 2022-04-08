import { expect } from "chai";
import { OK, BAD_REQUEST } from "http-status";
import { chai, server } from "../../index.spec";

describe("Route GET /v1/customers", function () {
  it("Returns HTTP status code 200 when call list all Customers", function (done) {
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

  it('Return HTTP Status Code 400 when params limit or offset is missing', (done) => {
    chai.request(server)
        .post('/v1/customers?')
        .end((err, res) => {
            expect(res).to.have.status(BAD_REQUEST);
            expect(res.body).to.have.property('statusCode', 400);
            expect(res.body).to.have.property('error', 'Bad Request');
            expect(res.body).to.have.property('message', 'Validation failed');
            expect(res.body.validation.body).to.have.property('source', 'body');
            expect(res.body.validation.body.keys).to.be.an('array').with.length(1);
            expect(res.body.validation.body.keys[0]).to.be.equal('name');
            expect(res.body.validation.body).to.have.property('message', '\"name\" is required');
            done();
        });
});  
});
