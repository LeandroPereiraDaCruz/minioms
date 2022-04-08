import { expect } from "chai";
import { OK } from "http-status";
import { chai, server } from "../../index.spec";

describe("Route GET /v1/customers", function () {
  it("Returns HTTP status code 200 when call getAllCustomers", function (done) {
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
});
