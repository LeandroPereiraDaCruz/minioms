import { expect, should } from "chai";
import { BAD_REQUEST, NOT_FOUND, OK } from "http-status";
import { seeder } from "../../../umzug";
import { chai, server } from "../../index.spec";
import jsonSchemaQueryError from "./__SCHEMA__/jsonSchemaQueryError.json";

const cleanDataBase = async () => {
  console.log("Clean database");
  await seeder.down();
};

const restoreDataBase = async () => {
  console.log("Restore database");
  await seeder.up();
};

describe("Route GET /v1/customers", function () {
  describe("Using empty database", function () {
    before(cleanDataBase);
    it("Returns HTTP status code 404 when empty", function (done) {
      chai
        .request(server)
        .get("/v1/customers")
        .end((err, res) => {
          expect(res).to.have.status(NOT_FOUND);
          done();
        });
    });
  });
  describe("Using database with records", function () {
    before(restoreDataBase);
    it("Returns HTTP status code 200", function (done) {
      chai
        .request(server)
        .get("/v1/customers")
        .end((err, res) => {
          expect(res).to.have.status(OK);
          expect(res.body).to.be.an("object");
          expect(res.body.meta).to.be.an("object");
          expect(res.body.records).to.be.an("array");

          expect(res.body.meta.offset).to.be.a("number");
          expect(res.body.meta.offset).to.equal(0);
          expect(res.body.meta.limit).to.be.a("number");
          expect(res.body.meta.limit).to.equal(50);

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
    it("Returns HTTP status code 200 and only 1 register when pass query param limit = 1 ", function (done) {
      chai
        .request(server)
        .get("/v1/customers?limit=1")
        .end((err, res) => {
          expect(res).to.have.status(OK);
          expect(res.body).to.be.an("object");
          expect(res.body.meta).to.be.an("object");
          expect(res.body.records).to.be.an("array");
          expect(res.body.records).to.have.lengthOf(1);

          expect(res.body.meta.limit).to.be.a("number");
          expect(res.body.meta.limit).to.equal(1);

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
    it("Return HTTP Status Code 400 when pass query param limit less than 0", (done) => {
      chai
        .request(server)
        .get("/v1/customers?limit=-1")
        .end((err, res) => {
          expect(res).to.have.status(BAD_REQUEST);
          should().exist(res.body);
          expect(res.body).to.be.jsonSchema(jsonSchemaQueryError);
          expect(res.body).to.have.property("statusCode", 400);
          expect(res.body).to.have.property("error", "Bad Request");
          expect(res.body).to.have.property("message", "Validation failed");
          expect(res.body.validation.query).to.have.property("source", "query");
          expect(res.body.validation.query.keys)
            .to.be.an("array")
            .with.length(1);
          expect(res.body.validation.query.keys[0]).to.be.equal("limit");
          expect(res.body.validation.query).to.have.property(
            "message",
            '"limit" must be greater than or equal to 0'
          );
          done();
        });
    });
    it("Return HTTP Status Code 400 when pass query param offset less than 0", (done) => {
      chai
        .request(server)
        .get("/v1/customers?offset=-1")
        .end((err, res) => {
          expect(res).to.have.status(BAD_REQUEST);
          should().exist(res.body);
          expect(res.body).to.be.jsonSchema(jsonSchemaQueryError);
          expect(res.body).to.have.property("statusCode", 400);
          expect(res.body).to.have.property("error", "Bad Request");
          expect(res.body).to.have.property("message", "Validation failed");
          expect(res.body.validation.query).to.have.property("source", "query");
          expect(res.body.validation.query.keys)
            .to.be.an("array")
            .with.length(1);
          expect(res.body.validation.query.keys[0]).to.be.equal("offset");
          expect(res.body.validation.query).to.have.property(
            "message",
            '"offset" must be greater than or equal to 0'
          );
          done();
        });
    });
  });
});
