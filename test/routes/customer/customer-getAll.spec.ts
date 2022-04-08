import { expect } from "chai";
import { OK } from "http-status";
import { CustomerResponse } from "../../../src/api/customer/customer-type";
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
        const customer = res.body.records.find(
          (customer: CustomerResponse) =>
            customer.uuid === "27456bb4-d1f2-4e88-a546-7eeb2eaa1f6b"
        );

        expect(customer).to.be.an("object");
        expect(customer).to.have.property("uuid");
        expect(customer).to.have.property("name");
        expect(customer).to.have.property("contact");
        expect(customer).to.have.property("document");
        expect(customer).to.have.property("createdAt");
        expect(customer).to.have.property("updatedAt");
        done();
      });
  });
});
