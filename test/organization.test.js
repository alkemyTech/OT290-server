// const mocha = require("mocha");
const chai = require("chai");
const { expect } = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");
const { createOrganization } = require("../controllers/organizations");
const sandbox = require("sinon").createSandbox();

chai.use(chaiHttp);

describe("Organization endpoint testing", () => {
  let organizationInfo = {};
  before(function createOrganization() {
    organizationInfo = {
      name: "Changing",
      image: "image",
      address: "address",
      phone: "3014857623",
      email: "contact@changing.org",
      welcomeText: "welcomeText",
      aboutUsText: "aboutUsText",
      facebook: "https://www.facebook.com/somotodos/",
      linkedin: "https://www.instagram.com/somostodos/",
      instagram: "https://www.linkedin.com/somostodos/",
    };
  });

  describe("Get public information", () => {
    it("Should get public information at {server}/organization/public", (done) => {
      chai
        .request(server)
        .get(`/organization/public`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          done();
        });
    });
  });

  describe("Post public information without loggin", () => {
    it("Should get 'Forbidden' status at {server}/organization/public", (done) => {
      chai
        .request(server)
        .post(`/organization/public`)
        .send(organizationInfo)
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.text).to.equal("Forbidden");
          done();
        });
    });
  });

  describe("Post public information as standard user", () => {
    let accessToken = null;

    before(async function getAuthenticated() {
      const authResponse = await chai
        .request(server)
        .post("/auth/login")
        .send({ email: "standardUser1@test.com", password: "##StrongPassword01" });
      accessToken = authResponse.body.accessToken;
    });

    it("Should get 'Forbidden' status at {server}/organization/public", (done) => {
      chai
        .request(server)
        .post(`/organization/public`)
        .send(organizationInfo)
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.text).to.equal("Forbidden");
          done();
        });
    });
  });

  describe("Post public information as Admin", () => {
    let accessToken = null;

    before(async function getAuthenticated() {
      const authResponse = await chai
        .request(server)
        .post("/auth/login")
        .send({ email: "adminUser5@test.com", password: "##StrongPassword05" });
      accessToken = authResponse.body.accessToken;
    });

    afterEach(function restoreOrganizationInfo() {
      sandbox.restore();
    });

    it("Should get error if receive wrong phone datatype at {server}/organization/public", (done) => {
      sandbox.stub(organizationInfo, "phone").value("1234");
      chai
        .request(server)
        .post(`/organization/public`)
        .set("authorization", "Bearer " + accessToken)
        .send(organizationInfo)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.text).to.include("phone");
          expect(res.text).to.include("Invalid value");
          expect(res).to.be.json;
          done();
        });
    });

    it("Should get error if receive wrong email datatype at {server}/organization/public", (done) => {
      sandbox.stub(organizationInfo, "email").value("1234");
      chai
        .request(server)
        .post(`/organization/public`)
        .set("authorization", "Bearer " + accessToken)
        .send(organizationInfo)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.text).to.include("email");
          expect(res.text).to.include("Invalid value");
          expect(res).to.be.json;
          done();
        });
    });

    it("Should get error if receive wrong facebook datatype at {server}/organization/public", (done) => {
      sandbox.stub(organizationInfo, "facebook").value("1234");
      chai
        .request(server)
        .post(`/organization/public`)
        .set("authorization", "Bearer " + accessToken)
        .send(organizationInfo)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.text).to.include("facebook");
          expect(res.text).to.include("Invalid value");
          expect(res).to.be.json;
          done();
        });
    });

    it("Should get error if receive wrong linkedin datatype at {server}/organization/public", (done) => {
      sandbox.stub(organizationInfo, "linkedin").value("1234");
      chai
        .request(server)
        .post(`/organization/public`)
        .set("authorization", "Bearer " + accessToken)
        .send(organizationInfo)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.text).to.include("linkedin");
          expect(res.text).to.include("Invalid value");
          expect(res).to.be.json;
          done();
        });
    });

    it("Should get error if receive wrong instagram datatype at {server}/organization/public", (done) => {
      sandbox.stub(organizationInfo, "instagram").value("1234");
      chai
        .request(server)
        .post(`/organization/public`)
        .set("authorization", "Bearer " + accessToken)
        .send(organizationInfo)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.text).to.include("instagram");
          expect(res.text).to.include("Invalid value");
          expect(res).to.be.json;
          done();
        });
    });

    it("Should response with 'Organization updated' message if fullfilled {server}/organization/public", (done) => {
      chai
        .request(server)
        .post(`/organization/public`)
        .set("authorization", "Bearer " + accessToken)
        .send(organizationInfo)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.text).to.include("Organization updated successfully");
          done();
        });
    });
  });
});
