import { expect, should } from "chai";
import { BAD_REQUEST, NOT_FOUND, OK } from "http-status";
import { chai, server } from "../../index.spec";
import jsonSchemaFindOneSuccess from "./__SCHEMA__/jsonSchemaFindOneSuccess.json";
import jsonSchemaPathParamError from "./__SCHEMA__/jsonSchemaPathParamError.json";
import { v4 } from "uuid";

describe("Route GET /v1/customers/:customerUuid", function () {
  it("Returns HTTP status code 404 when not find customer", function (done) {
    chai
      .request(server)
      .get(`/v1/customers/${v4()}`)
      .end((err, res) => {
        expect(res).to.have.status(NOT_FOUND);
        done();
      });
  });
  it("Returns HTTP status code 200 when find customer", function (done) {
    chai
      .request(server)
      .get(`/v1/customers/c7402301-427f-40d4-ad7b-42b28fb2713a`)
      .end((err, res) => {
        expect(res).to.have.status(OK);
        should().exist(res.body);
        expect(res.body).to.be.jsonSchema(jsonSchemaFindOneSuccess);
        done();
      });
  });
  it("Returns HTTP status code 400 when pass customer's id not been the UUID type", function (done) {
    chai
      .request(server)
      .get(`/v1/customers/1`)
      .end((err, res) => {
        expect(res).to.have.status(BAD_REQUEST);
        should().exist(res.body);
        expect(res.body).to.be.jsonSchema(jsonSchemaPathParamError);
        expect(res.body).to.have.property("statusCode", 400);
        expect(res.body).to.have.property("error", "Bad Request");
        expect(res.body).to.have.property("message", "Validation failed");
        expect(res.body.validation.params).to.have.property("source", "params");
        expect(res.body.validation.params.keys)
          .to.be.an("array")
          .with.length(1);
        expect(res.body.validation.params.keys[0]).to.be.equal("customerUuid");
        expect(res.body.validation.params).to.have.property(
          "message",
          '"customerUuid" with value "1" fails to match the required pattern: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i'
        );
        done();
      });
  });
});
