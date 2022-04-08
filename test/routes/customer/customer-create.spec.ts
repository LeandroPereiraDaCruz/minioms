import { expect, should } from "chai";
import { BAD_REQUEST, CONFLICT, CREATED } from "http-status";
import { chai, server } from "../../index.spec";
import jsonSchemaError from "./__SCHEMA__/jsonSchemaError.json";
import jsonSchemaSuccess from "./__SCHEMA__/jsonSchemaSuccess.json";
// https://www.jsonschema.net/home

describe("Route POST /v1/customers", function () {
  it("Return HTTP Status Code 400 when body is missing", (done) => {
    chai
      .request(server)
      .post("/v1/customers")
      .end((err, res) => {
        expect(res).to.have.status(BAD_REQUEST);
        should().exist(res.body);
        expect(res.body).to.be.jsonSchema(jsonSchemaError);
        expect(res.body).to.have.property("statusCode", 400);
        expect(res.body).to.have.property("error", "Bad Request");
        expect(res.body).to.have.property("message", "Validation failed");
        expect(res.body.validation.body).to.have.property("source", "body");
        expect(res.body.validation.body.keys).to.be.an("array").with.length(1);
        expect(res.body.validation.body.keys[0]).to.be.equal("name");
        expect(res.body.validation.body).to.have.property(
          "message",
          '"name" is required'
        );
        done();
      });
  });

  it("Return HTTP Status Code 400 when body.name is missing", (done) => {
    chai
      .request(server)
      .post("/v1/customers")
      .send({})
      .end((err, res) => {
        expect(res).to.have.status(BAD_REQUEST);
        should().exist(res.body);
        expect(res.body).to.be.jsonSchema(jsonSchemaError);
        expect(res.body).to.have.property("statusCode", 400);
        expect(res.body).to.have.property("error", "Bad Request");
        expect(res.body).to.have.property("message", "Validation failed");
        expect(res.body.validation.body).to.have.property("source", "body");
        expect(res.body.validation.body.keys).to.be.an("array").with.length(1);
        expect(res.body.validation.body.keys[0]).to.be.equal("name");
        expect(res.body.validation.body).to.have.property(
          "message",
          '"name" is required'
        );
        done();
      });
  });

  it("Return HTTP Status Code 400 when body.name is not a string", (done) => {
    chai
      .request(server)
      .post("/v1/customers")
      .send({
        name: true,
      })
      .end((err, res) => {
        expect(res).to.have.status(BAD_REQUEST);
        should().exist(res.body);
        expect(res.body).to.be.jsonSchema(jsonSchemaError);
        expect(res.body).to.have.property("statusCode", 400);
        expect(res.body).to.have.property("error", "Bad Request");
        expect(res.body).to.have.property("message", "Validation failed");
        expect(res.body.validation.body).to.have.property("source", "body");
        expect(res.body.validation.body.keys).to.be.an("array").with.length(1);
        expect(res.body.validation.body.keys[0]).to.be.equal("name");
        expect(res.body.validation.body).to.have.property(
          "message",
          '"name" must be a string'
        );
        done();
      });
  });

  it("Return HTTP Status Code 400 when body.name is an empty string", (done) => {
    chai
      .request(server)
      .post("/v1/customers")
      .send({
        name: " ",
      })
      .end((err, res) => {
        expect(res).to.have.status(BAD_REQUEST);
        should().exist(res.body);
        expect(res.body).to.be.jsonSchema(jsonSchemaError);
        expect(res.body).to.be.have.property("statusCode", BAD_REQUEST);
        expect(res.body).to.be.have.property("error", "Bad Request");
        expect(res.body).to.be.have.property("message", "Validation failed");
        should().exist(res.body.validation.body);
        expect(res.body.validation.body).to.be.have.property("source", "body");
        expect(res.body.validation.body.keys).to.be.an("array").with.length(1);
        expect(res.body.validation.body.keys[0]).to.be.equal("name");
        expect(res.body.validation.body).to.be.have.property(
          "message",
          '"name" is not allowed to be empty'
        );
        done();
      });
  });

  it("Return HTTP Status Code 400 when body.name is a string with length greater than 100", (done) => {
    chai
      .request(server)
      .post("/v1/customers")
      .send({
        name: "a".repeat(101),
      })
      .end((err, res) => {
        expect(res).to.have.status(BAD_REQUEST);
        should().exist(res.body);
        expect(res.body).to.be.jsonSchema(jsonSchemaError);
        expect(res.body).to.be.have.property("statusCode", BAD_REQUEST);
        expect(res.body).to.be.have.property("error", "Bad Request");
        expect(res.body).to.be.have.property("message", "Validation failed");
        should().exist(res.body.validation.body);
        expect(res.body.validation.body).to.be.have.property("source", "body");
        expect(res.body.validation.body.keys).to.be.an("array").with.length(1);
        expect(res.body.validation.body.keys[0]).to.be.equal("name");
        expect(res.body.validation.body).to.be.have.property(
          "message",
          '"name" length must be less than or equal to 100 characters long'
        );
        done();
      });
  });

  it("Return HTTP Status Code 400 when body.document is not an object", (done) => {
    chai
      .request(server)
      .post("/v1/customers")
      .send({
        name: "name",
        document: 1,
      })
      .end((err, res) => {
        expect(res).to.have.status(BAD_REQUEST);
        should().exist(res.body);
        expect(res.body).to.be.jsonSchema(jsonSchemaError);
        expect(res.body).to.be.have.property("statusCode", BAD_REQUEST);
        expect(res.body).to.be.have.property("error", "Bad Request");
        expect(res.body).to.be.have.property("message", "Validation failed");
        should().exist(res.body.validation.body);
        expect(res.body.validation.body).to.be.have.property("source", "body");
        expect(res.body.validation.body.keys).to.be.an("array").with.length(1);
        expect(res.body.validation.body.keys[0]).to.be.equal("document");
        expect(res.body.validation.body).to.be.have.property(
          "message",
          '"document" must be of type object'
        );
        done();
      });
  });

  it("Return HTTP Status Code 400 when body.document is an empty object", (done) => {
    chai
      .request(server)
      .post("/v1/customers")
      .send({
        name: "name",
        document: {},
      })
      .end((err, res) => {
        expect(res).to.have.status(BAD_REQUEST);
        should().exist(res.body);
        expect(res.body).to.be.jsonSchema(jsonSchemaError);
        expect(res.body).to.be.have.property("statusCode", BAD_REQUEST);
        expect(res.body).to.be.have.property("error", "Bad Request");
        expect(res.body).to.be.have.property("message", "Validation failed");
        should().exist(res.body.validation.body);
        expect(res.body.validation.body).to.be.have.property("source", "body");
        expect(res.body.validation.body.keys).to.be.an("array").with.length(1);
        expect(res.body.validation.body.keys[0]).to.be.equal("document");
        expect(res.body.validation.body).to.be.have.property(
          "message",
          '"document" must contain at least one of [cpf, cnpj]'
        );
        done();
      });
  });

  it("Return HTTP Status Code 400 when body.document is has both keys cpf and cnpj", (done) => {
    chai
      .request(server)
      .post("/v1/customers")
      .send({
        name: "name",
        document: {
          cpf: "99999999999",
          cnpj: "99999999999999",
        },
      })
      .end((err, res) => {
        expect(res).to.have.status(BAD_REQUEST);
        should().exist(res.body);
        expect(res.body).to.be.jsonSchema(jsonSchemaError);
        expect(res.body).to.be.have.property("statusCode", BAD_REQUEST);
        expect(res.body).to.be.have.property("error", "Bad Request");
        expect(res.body).to.be.have.property("message", "Validation failed");
        should().exist(res.body.validation.body);
        expect(res.body.validation.body).to.be.have.property("source", "body");
        expect(res.body.validation.body.keys).to.be.an("array").with.length(1);
        expect(res.body.validation.body.keys[0]).to.be.equal("document");
        expect(res.body.validation.body).to.be.have.property(
          "message",
          '"document" contains a conflict between exclusive peers [cpf, cnpj]'
        );
        done();
      });
  });

  it("Return HTTP Status Code 400 when body.document.cpf is not a string", (done) => {
    chai
      .request(server)
      .post("/v1/customers")
      .send({
        name: "name",
        document: {
          cpf: 99999999999,
        },
      })
      .end((err, res) => {
        expect(res).to.have.status(BAD_REQUEST);
        should().exist(res.body);
        expect(res.body).to.be.jsonSchema(jsonSchemaError);
        expect(res.body).to.be.have.property("statusCode", BAD_REQUEST);
        expect(res.body).to.be.have.property("error", "Bad Request");
        expect(res.body).to.be.have.property("message", "Validation failed");
        should().exist(res.body.validation.body);
        expect(res.body.validation.body).to.be.have.property("source", "body");
        expect(res.body.validation.body.keys).to.be.an("array").with.length(1);
        expect(res.body.validation.body.keys[0]).to.be.equal("document.cpf");
        expect(res.body.validation.body).to.be.have.property(
          "message",
          '"document.cpf" must be a string'
        );
        done();
      });
  });

  it("Return HTTP Status Code 400 when body.document.cpf is an empty string", (done) => {
    chai
      .request(server)
      .post("/v1/customers")
      .send({
        name: "name",
        document: {
          cpf: "",
        },
      })
      .end((err, res) => {
        expect(res).to.have.status(BAD_REQUEST);
        should().exist(res.body);
        expect(res.body).to.be.jsonSchema(jsonSchemaError);
        expect(res.body).to.be.have.property("statusCode", BAD_REQUEST);
        expect(res.body).to.be.have.property("error", "Bad Request");
        expect(res.body).to.be.have.property("message", "Validation failed");
        should().exist(res.body.validation.body);
        expect(res.body.validation.body).to.be.have.property("source", "body");
        expect(res.body.validation.body.keys).to.be.an("array").with.length(1);
        expect(res.body.validation.body.keys[0]).to.be.equal("document.cpf");
        expect(res.body.validation.body).to.be.have.property(
          "message",
          '"document.cpf" is not allowed to be empty'
        );
        done();
      });
  });

  it("Return HTTP Status Code 400 when body.document.cpf length is lesser than 11", (done) => {
    chai
      .request(server)
      .post("/v1/customers")
      .send({
        name: "name",
        document: {
          cpf: "9999999999",
        },
      })
      .end((err, res) => {
        expect(res).to.have.status(BAD_REQUEST);
        should().exist(res.body);
        expect(res.body).to.be.jsonSchema(jsonSchemaError);
        expect(res.body).to.be.have.property("statusCode", BAD_REQUEST);
        expect(res.body).to.be.have.property("error", "Bad Request");
        expect(res.body).to.be.have.property("message", "Validation failed");
        should().exist(res.body.validation.body);
        expect(res.body.validation.body).to.be.have.property("source", "body");
        expect(res.body.validation.body.keys).to.be.an("array").with.length(1);
        expect(res.body.validation.body.keys[0]).to.be.equal("document.cpf");
        expect(res.body.validation.body).to.be.have.property(
          "message",
          '"document.cpf" length must be 11 characters long'
        );
        done();
      });
  });

  it("Return HTTP Status Code 400 when body.document.cpf length is greater than 11", (done) => {
    chai
      .request(server)
      .post("/v1/customers")
      .send({
        name: "name",
        document: {
          cpf: "999999999999",
        },
      })
      .end((err, res) => {
        expect(res).to.have.status(BAD_REQUEST);
        should().exist(res.body);
        expect(res.body).to.be.jsonSchema(jsonSchemaError);
        expect(res.body).to.be.have.property("statusCode", BAD_REQUEST);
        expect(res.body).to.be.have.property("error", "Bad Request");
        expect(res.body).to.be.have.property("message", "Validation failed");
        should().exist(res.body.validation.body);
        expect(res.body.validation.body).to.be.have.property("source", "body");
        expect(res.body.validation.body.keys).to.be.an("array").with.length(1);
        expect(res.body.validation.body.keys[0]).to.be.equal("document.cpf");
        expect(res.body.validation.body).to.be.have.property(
          "message",
          '"document.cpf" length must be 11 characters long'
        );
        done();
      });
  });

  it("Return HTTP Status Code 400 when body.document.cpf has invalid pattern", (done) => {
    chai
      .request(server)
      .post("/v1/customers")
      .send({
        name: "name",
        document: {
          cpf: "9999999999a",
        },
      })
      .end((err, res) => {
        expect(res).to.have.status(BAD_REQUEST);
        should().exist(res.body);
        expect(res.body).to.be.jsonSchema(jsonSchemaError);
        expect(res.body).to.be.have.property("statusCode", BAD_REQUEST);
        expect(res.body).to.be.have.property("error", "Bad Request");
        expect(res.body).to.be.have.property("message", "Validation failed");
        should().exist(res.body.validation.body);
        expect(res.body.validation.body).to.be.have.property("source", "body");
        expect(res.body.validation.body.keys).to.be.an("array").with.length(1);
        expect(res.body.validation.body.keys[0]).to.be.equal("document.cpf");
        expect(res.body.validation.body).to.be.have.property(
          "message",
          '"document.cpf" with value "9999999999a" fails to match the required pattern: /^\\d+$/'
        );
        done();
      });
  });

  it("Return HTTP Status Code 400 when body.document.cnpj is not a string", (done) => {
    chai
      .request(server)
      .post("/v1/customers")
      .send({
        name: "name",
        document: {
          cnpj: 99999999999,
        },
      })
      .end((err, res) => {
        expect(res).to.have.status(BAD_REQUEST);
        should().exist(res.body);
        expect(res.body).to.be.jsonSchema(jsonSchemaError);
        expect(res.body).to.be.have.property("statusCode", BAD_REQUEST);
        expect(res.body).to.be.have.property("error", "Bad Request");
        expect(res.body).to.be.have.property("message", "Validation failed");
        should().exist(res.body.validation.body);
        expect(res.body.validation.body).to.be.have.property("source", "body");
        expect(res.body.validation.body.keys).to.be.an("array").with.length(1);
        expect(res.body.validation.body.keys[0]).to.be.equal("document.cnpj");
        expect(res.body.validation.body).to.be.have.property(
          "message",
          '"document.cnpj" must be a string'
        );
        done();
      });
  });

  it("Return HTTP Status Code 400 when body.document.cnpj is an empty string", (done) => {
    chai
      .request(server)
      .post("/v1/customers")
      .send({
        name: "name",
        document: {
          cnpj: "",
        },
      })
      .end((err, res) => {
        expect(res).to.have.status(BAD_REQUEST);
        should().exist(res.body);
        expect(res.body).to.be.jsonSchema(jsonSchemaError);
        expect(res.body).to.be.have.property("statusCode", BAD_REQUEST);
        expect(res.body).to.be.have.property("error", "Bad Request");
        expect(res.body).to.be.have.property("message", "Validation failed");
        should().exist(res.body.validation.body);
        expect(res.body.validation.body).to.be.have.property("source", "body");
        expect(res.body.validation.body.keys).to.be.an("array").with.length(1);
        expect(res.body.validation.body.keys[0]).to.be.equal("document.cnpj");
        expect(res.body.validation.body).to.be.have.property(
          "message",
          '"document.cnpj" is not allowed to be empty'
        );
        done();
      });
  });

  it("Return HTTP Status Code 400 when body.document.cnpj length is lesser than 14", (done) => {
    chai
      .request(server)
      .post("/v1/customers")
      .send({
        name: "name",
        document: {
          cnpj: "9999999999999",
        },
      })
      .end((err, res) => {
        expect(res).to.have.status(BAD_REQUEST);
        should().exist(res.body);
        expect(res.body).to.be.jsonSchema(jsonSchemaError);
        expect(res.body).to.be.have.property("statusCode", BAD_REQUEST);
        expect(res.body).to.be.have.property("error", "Bad Request");
        expect(res.body).to.be.have.property("message", "Validation failed");
        should().exist(res.body.validation.body);
        expect(res.body.validation.body).to.be.have.property("source", "body");
        expect(res.body.validation.body.keys).to.be.an("array").with.length(1);
        expect(res.body.validation.body.keys[0]).to.be.equal("document.cnpj");
        expect(res.body.validation.body).to.be.have.property(
          "message",
          '"document.cnpj" length must be 14 characters long'
        );
        done();
      });
  });

  it("Return HTTP Status Code 400 when body.document.cnpj length is greater than 14", (done) => {
    chai
      .request(server)
      .post("/v1/customers")
      .send({
        name: "name",
        document: {
          cnpj: "9".repeat(15),
        },
      })
      .end((err, res) => {
        expect(res).to.have.status(BAD_REQUEST);
        should().exist(res.body);
        expect(res.body).to.be.jsonSchema(jsonSchemaError);
        expect(res.body).to.be.have.property("statusCode", BAD_REQUEST);
        expect(res.body).to.be.have.property("error", "Bad Request");
        expect(res.body).to.be.have.property("message", "Validation failed");
        should().exist(res.body.validation.body);
        expect(res.body.validation.body).to.be.have.property("source", "body");
        expect(res.body.validation.body.keys).to.be.an("array").with.length(1);
        expect(res.body.validation.body.keys[0]).to.be.equal("document.cnpj");
        expect(res.body.validation.body).to.be.have.property(
          "message",
          '"document.cnpj" length must be 14 characters long'
        );
        done();
      });
  });

  it("Return HTTP Status Code 400 when body.document.cnpj has invalid pattern", (done) => {
    chai
      .request(server)
      .post("/v1/customers")
      .send({
        name: "name",
        document: {
          cnpj: "9999999999999a",
        },
      })
      .end((err, res) => {
        expect(res).to.have.status(BAD_REQUEST);
        should().exist(res.body);
        expect(res.body).to.be.jsonSchema(jsonSchemaError);
        expect(res.body).to.be.have.property("statusCode", BAD_REQUEST);
        expect(res.body).to.be.have.property("error", "Bad Request");
        expect(res.body).to.be.have.property("message", "Validation failed");
        should().exist(res.body.validation.body);
        expect(res.body.validation.body).to.be.have.property("source", "body");
        expect(res.body.validation.body.keys).to.be.an("array").with.length(1);
        expect(res.body.validation.body.keys[0]).to.be.equal("document.cnpj");
        expect(res.body.validation.body).to.be.have.property(
          "message",
          '"document.cnpj" with value "9999999999999a" fails to match the required pattern: /^\\d+$/'
        );
        done();
      });
  });

  it("Return HTTP Status Code 400 when body.contact is missing", (done) => {
    chai
      .request(server)
      .post("/v1/customers")
      .send({
        name: "name",
        document: {
          cnpj: "99999999999999",
        },
      })
      .end((err, res) => {
        expect(res).to.have.status(BAD_REQUEST);
        should().exist(res.body);
        expect(res.body).to.be.jsonSchema(jsonSchemaError);
        expect(res.body).to.be.have.property("statusCode", BAD_REQUEST);
        expect(res.body).to.be.have.property("error", "Bad Request");
        expect(res.body).to.be.have.property("message", "Validation failed");
        should().exist(res.body.validation.body);
        expect(res.body.validation.body).to.be.have.property("source", "body");
        expect(res.body.validation.body.keys).to.be.an("array").with.length(1);
        expect(res.body.validation.body.keys[0]).to.be.equal("contact");
        expect(res.body.validation.body).to.be.have.property(
          "message",
          '"contact" is required'
        );
        done();
      });
  });

  it("Return HTTP Status Code 400 when body.contact is not an object", (done) => {
    chai
      .request(server)
      .post("/v1/customers")
      .send({
        name: "name",
        document: {
          cnpj: "99999999999999",
        },
        contact: false,
      })
      .end((err, res) => {
        expect(res).to.have.status(BAD_REQUEST);
        should().exist(res.body);
        expect(res.body).to.be.jsonSchema(jsonSchemaError);
        expect(res.body).to.be.have.property("statusCode", BAD_REQUEST);
        expect(res.body).to.be.have.property("error", "Bad Request");
        expect(res.body).to.be.have.property("message", "Validation failed");
        should().exist(res.body.validation.body);
        expect(res.body.validation.body).to.be.have.property("source", "body");
        expect(res.body.validation.body.keys).to.be.an("array").with.length(1);
        expect(res.body.validation.body.keys[0]).to.be.equal("contact");
        expect(res.body.validation.body).to.be.have.property(
          "message",
          '"contact" must be of type object'
        );
        done();
      });
  });

  it("Return HTTP Status Code 400 when body.contact.email is missing", (done) => {
    chai
      .request(server)
      .post("/v1/customers")
      .send({
        name: "name",
        document: {
          cnpj: "99999999999999",
        },
        contact: {},
      })
      .end((err, res) => {
        expect(res).to.have.status(BAD_REQUEST);
        should().exist(res.body);
        expect(res.body).to.be.jsonSchema(jsonSchemaError);
        expect(res.body).to.be.have.property("statusCode", BAD_REQUEST);
        expect(res.body).to.be.have.property("error", "Bad Request");
        expect(res.body).to.be.have.property("message", "Validation failed");
        should().exist(res.body.validation.body);
        expect(res.body.validation.body).to.be.have.property("source", "body");
        expect(res.body.validation.body.keys).to.be.an("array").with.length(1);
        expect(res.body.validation.body.keys[0]).to.be.equal("contact.email");
        expect(res.body.validation.body).to.be.have.property(
          "message",
          '"contact.email" is required'
        );
        done();
      });
  });

  it("Return HTTP Status Code 400 when body.contact.email is not a string", (done) => {
    chai
      .request(server)
      .post("/v1/customers")
      .send({
        name: "name",
        document: {
          cnpj: "99999999999999",
        },
        contact: {
          email: 1,
        },
      })
      .end((err, res) => {
        expect(res).to.have.status(BAD_REQUEST);
        should().exist(res.body);
        expect(res.body).to.be.jsonSchema(jsonSchemaError);
        expect(res.body).to.be.have.property("statusCode", BAD_REQUEST);
        expect(res.body).to.be.have.property("error", "Bad Request");
        expect(res.body).to.be.have.property("message", "Validation failed");
        should().exist(res.body.validation.body);
        expect(res.body.validation.body).to.be.have.property("source", "body");
        expect(res.body.validation.body.keys).to.be.an("array").with.length(1);
        expect(res.body.validation.body.keys[0]).to.be.equal("contact.email");
        expect(res.body.validation.body).to.be.have.property(
          "message",
          '"contact.email" must be a string'
        );
        done();
      });
  });

  it("Return HTTP Status Code 400 when body.contact.email has invalid format", (done) => {
    chai
      .request(server)
      .post("/v1/customers")
      .send({
        name: "name",
        document: {
          cnpj: "99999999999999",
        },
        contact: {
          email: "emailemail.com",
        },
      })
      .end((err, res) => {
        expect(res).to.have.status(BAD_REQUEST);
        should().exist(res.body);
        expect(res.body).to.be.jsonSchema(jsonSchemaError);
        expect(res.body).to.be.have.property("statusCode", BAD_REQUEST);
        expect(res.body).to.be.have.property("error", "Bad Request");
        expect(res.body).to.be.have.property("message", "Validation failed");
        should().exist(res.body.validation.body);
        expect(res.body.validation.body).to.be.have.property("source", "body");
        expect(res.body.validation.body.keys).to.be.an("array").with.length(1);
        expect(res.body.validation.body.keys[0]).to.be.equal("contact.email");
        expect(res.body.validation.body).to.be.have.property(
          "message",
          '"contact.email" must be a valid email'
        );
        done();
      });
  });

  it("Return HTTP Status Code 400 when body.contact.email length is greater than 100", (done) => {
    chai
      .request(server)
      .post("/v1/customers")
      .send({
        name: "name",
        document: {
          cnpj: "99999999999999",
        },
        contact: {
          email: "e".repeat(91) + "@email.com",
        },
      })
      .end((err, res) => {
        expect(res).to.have.status(BAD_REQUEST);
        should().exist(res.body);
        expect(res.body).to.be.jsonSchema(jsonSchemaError);
        expect(res.body).to.be.have.property("statusCode", BAD_REQUEST);
        expect(res.body).to.be.have.property("error", "Bad Request");
        expect(res.body).to.be.have.property("message", "Validation failed");
        should().exist(res.body.validation.body);
        expect(res.body.validation.body).to.be.have.property("source", "body");
        expect(res.body.validation.body.keys).to.be.an("array").with.length(1);
        expect(res.body.validation.body.keys[0]).to.be.equal("contact.email");
        expect(res.body.validation.body).to.be.have.property(
          "message",
          '"contact.email" must be a valid email'
        );
        done();
      });
  });

  it("Return HTTP Status Code 400 when body.contact.phone is not a string", (done) => {
    chai
      .request(server)
      .post("/v1/customers")
      .send({
        name: "name",
        document: {
          cnpj: "99999999999999",
        },
        contact: {
          email: "email@email.com",
          phone: true,
        },
      })
      .end((err, res) => {
        expect(res).to.have.status(BAD_REQUEST);
        should().exist(res.body);
        expect(res.body).to.be.jsonSchema(jsonSchemaError);
        expect(res.body).to.be.have.property("statusCode", BAD_REQUEST);
        expect(res.body).to.be.have.property("error", "Bad Request");
        expect(res.body).to.be.have.property("message", "Validation failed");
        should().exist(res.body.validation.body);
        expect(res.body.validation.body).to.be.have.property("source", "body");
        expect(res.body.validation.body.keys).to.be.an("array").with.length(1);
        expect(res.body.validation.body.keys[0]).to.be.equal("contact.phone");
        expect(res.body.validation.body).to.be.have.property(
          "message",
          '"contact.phone" must be a string'
        );
        done();
      });
  });

  it("Return HTTP Status Code 400 when body.contact.phone is an empty string", (done) => {
    chai
      .request(server)
      .post("/v1/customers")
      .send({
        name: "name",
        document: {
          cnpj: "99999999999999",
        },
        contact: {
          email: "email@email.com",
          phone: "",
        },
      })
      .end((err, res) => {
        expect(res).to.have.status(BAD_REQUEST);
        should().exist(res.body);
        expect(res.body).to.be.jsonSchema(jsonSchemaError);
        expect(res.body).to.be.have.property("statusCode", BAD_REQUEST);
        expect(res.body).to.be.have.property("error", "Bad Request");
        expect(res.body).to.be.have.property("message", "Validation failed");
        should().exist(res.body.validation.body);
        expect(res.body.validation.body).to.be.have.property("source", "body");
        expect(res.body.validation.body.keys).to.be.an("array").with.length(1);
        expect(res.body.validation.body.keys[0]).to.be.equal("contact.phone");
        expect(res.body.validation.body).to.be.have.property(
          "message",
          '"contact.phone" is not allowed to be empty'
        );
        done();
      });
  });

  it("Return HTTP Status Code 400 when body.contact.phone length is greater than 15", (done) => {
    chai
      .request(server)
      .post("/v1/customers")
      .send({
        name: "name",
        document: {
          cnpj: "99999999999999",
        },
        contact: {
          email: "email@email.com",
          phone: "a".repeat(16),
        },
      })
      .end((err, res) => {
        expect(res).to.have.status(BAD_REQUEST);
        should().exist(res.body);
        expect(res.body).to.be.jsonSchema(jsonSchemaError);
        expect(res.body).to.be.have.property("statusCode", BAD_REQUEST);
        expect(res.body).to.be.have.property("error", "Bad Request");
        expect(res.body).to.be.have.property("message", "Validation failed");
        should().exist(res.body.validation.body);
        expect(res.body.validation.body).to.be.have.property("source", "body");
        expect(res.body.validation.body.keys).to.be.an("array").with.length(1);
        expect(res.body.validation.body.keys[0]).to.be.equal("contact.phone");
        expect(res.body.validation.body).to.be.have.property(
          "message",
          '"contact.phone" length must be less than or equal to 15 characters long'
        );
        done();
      });
  });

  it("Return HTTP Status Code 201 when body (customer) is valid with cnpj", (done) => {
    chai
      .request(server)
      .post("/v1/customers")
      .send({
        name: "name",
        document: {
          cnpj: "99999999999999",
        },
        contact: {
          email: "email_pj@email.com",
          phone: "(16) 99999-9999",
        },
      })
      .end((err, res) => {
        expect(res).to.have.status(CREATED);
        should().exist(res.body);
        expect(res.body).to.be.jsonSchema(jsonSchemaSuccess);
        done();
      });
  });

  it("Return HTTP Status Code 201 when body (customer) is valid with cpf", (done) => {
    chai
      .request(server)
      .post("/v1/customers")
      .send({
        name: "name",
        document: {
          cpf: "99999999999",
        },
        contact: {
          email: "email_pf@email.com",
          phone: "(16) 99999-9999",
        },
      })
      .end((err, res) => {
        expect(res).to.have.status(CREATED);
        should().exist(res.body);
        expect(res.body).to.be.jsonSchema(jsonSchemaSuccess);
        done();
      });
  });

  it("Return HTTP Status Code 409 when body (customer) already exists with same cnpj", (done) => {
    chai
      .request(server)
      .post("/v1/customers")
      .send({
        name: "name",
        document: {
          cnpj: "99999999999991",
        },
        contact: {
          email: "email2@email.com",
          phone: "(16) 99999-9999",
        },
      })
      .end((err, res) => {
        expect(res).to.have.status(CONFLICT);
        should().exist(res.body);
        expect(res.body).to.be.jsonSchema(jsonSchemaError);
        expect(res.body).to.be.have.property("statusCode", CONFLICT);
        expect(res.body).to.be.have.property("error", "Conflict");
        expect(res.body).to.be.have.property("message", "Validation error");
        should().exist(res.body.validation.body);
        expect(res.body.validation.body).to.be.have.property("source", "body");
        expect(res.body.validation.body.keys).to.be.an("array").with.length(1);
        expect(res.body.validation.body.keys[0]).to.be.equal("cnpj");
        expect(res.body.validation.body).to.be.have.property(
          "message",
          "cnpj must be unique"
        );
        done();
      });
  });

  it("Return HTTP Status Code 409 when body (customer) already exists with same cpf", (done) => {
    chai
      .request(server)
      .post("/v1/customers")
      .send({
        name: "name",
        document: {
          cpf: "99999999991",
        },
        contact: {
          email: "email3@email.com",
          phone: "(16) 99999-9999",
        },
      })
      .end((err, res) => {
        expect(res).to.have.status(CONFLICT);
        should().exist(res.body);
        expect(res.body).to.be.jsonSchema(jsonSchemaError);
        expect(res.body).to.be.have.property("statusCode", CONFLICT);
        expect(res.body).to.be.have.property("error", "Conflict");
        expect(res.body).to.be.have.property("message", "Validation error");
        should().exist(res.body.validation.body);
        expect(res.body.validation.body).to.be.have.property("source", "body");
        expect(res.body.validation.body.keys).to.be.an("array").with.length(1);
        expect(res.body.validation.body.keys[0]).to.be.equal("cpf");
        expect(res.body.validation.body).to.be.have.property(
          "message",
          "cpf must be unique"
        );
        done();
      });
  });

  it("Return HTTP Status Code 409 when body (customer) already exists with same email", (done) => {
    chai
      .request(server)
      .post("/v1/customers")
      .send({
        name: "Company Y Ltda",
        document: {
          cnpj: "99999999999992",
        },
        contact: {
          email: "company@companyy.com",
          phone: "(16) 99999-9999",
        },
      })
      .end((err, res) => {
        expect(res).to.have.status(CONFLICT);
        should().exist(res.body);
        expect(res.body).to.be.jsonSchema(jsonSchemaError);
        expect(res.body).to.be.have.property("statusCode", CONFLICT);
        expect(res.body).to.be.have.property("error", "Conflict");
        expect(res.body).to.be.have.property("message", "Validation error");
        should().exist(res.body.validation.body);
        expect(res.body.validation.body).to.be.have.property("source", "body");
        expect(res.body.validation.body.keys).to.be.an("array").with.length(1);
        expect(res.body.validation.body.keys[0]).to.be.equal("email");
        expect(res.body.validation.body).to.be.have.property(
          "message",
          "email must be unique"
        );
        done();
      });
  });
});
