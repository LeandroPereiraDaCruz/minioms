import { expect } from "chai";
import { BAD_REQUEST, NOT_FOUND, OK } from "http-status";
import { chai, server } from "../../index.spec";

describe("Route GET /v1/customers/:uuid", function () {
  it("Returns HTTP status code 200 when call getCustomerById", function (done) {
    const correct_uuid = "27456bb4-d1f2-4e88-a546-7eeb2eaa1f6b";

    chai
      .request(server)
      .get(`/v1/customers/${correct_uuid}`)
      .end((err, res) => {
        expect(res).to.have.status(OK);
        expect(res.body).to.be.an("object");
        expect(res.body.records).to.be.an("array");
        expect(res.body.records).to.be.length(1);
        expect(res.body.records[0].uuid).to.be.equal(correct_uuid);
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

  it("Returns HTTP status code 400 when call getCustomerById with invalid uuid", function (done) {
    const invalid_uuid = "invalid_uuid";

    chai
      .request(server)
      .get(`/v1/customers/${invalid_uuid}`)
      .end((err, res) => {
        expect(res).to.have.status(BAD_REQUEST);
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

  it("Returns HTTP status code 404 when not find user with uuid provided", function (done) {
    const non_existent_user = "27456bb4-d1f2-4e88-a546-7eeb2eaa1f62";

    chai
      .request(server)
      .get(`/v1/customers/${non_existent_user}`)
      .end((err, res) => {
        expect(res).to.have.status(NOT_FOUND);
        expect(res.body).to.be.empty;
        done();
      });
  });
});
