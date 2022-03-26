import { expect } from "chai";
import { OK, NOT_FOUND } from "http-status";
import { chai, server } from "../../index.spec";

describe("Route GET /v1/customers/{uuid}", function () {
  it("Returns HTTP status code 200 when call getCustomersById", function (done) {
    const uuid = '27456bb4-d1f2-4e88-a546-7eeb2eaa1f6b';
    chai
      .request(server)
      .get(`/v1/customers/${uuid}`)
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

  it("Returns HTTP status code 404 when call getCustomersById with uuid invalid", function (done) {
    const uuid = '27456bb4-d1f2-4e88-a546-111111111111';
    chai
      .request(server)
      .get(`/v1/customers/${uuid}`)
      .end((err, res) => {
        expect(res).to.have.status(NOT_FOUND);
        done();
      });
  });
});
