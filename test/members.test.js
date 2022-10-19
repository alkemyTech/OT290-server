// const mocha = require("mocha");
const chai = require("chai");
const { expect } = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");
const sandbox = require("sinon").createSandbox();
const { Members } = require("../models");

chai.use(chaiHttp);

describe("Mebers endpoint testing", () => {
  let accessTokenAdmin = null;
  let accessTokenStandar = null;
  let newmember;
  let memberId = null;

  before(async function getAuthAsAdmin() {
    const authResponse = await chai
      .request(server)
      .post("/auth/login")
      .send({ email: "adminUser5@test.com", password: "##StrongPassword05" });
    accessTokenAdmin = authResponse.body.accessToken;
  });

  before(async function getAuthAsStandar() {
    const authResponse = await chai
      .request(server)
      .post("/auth/login")
      .send({ email: "standardUser1@test.com", password: "##StrongPassword01" });
    accessTokenStandar = authResponse.body.accessToken;
  });

  before(async function createMember() {
    newmember = await Members.create({
      name: "MemberTest",
      facebookUrl: "https://facebook.com",
      instagramUrl: "https://instagram.com",
      linkedinUrl: "https://linkedin.com",
      image: "https://grandimageinc.com/wp-content/uploads/2015/09/icon-user-default.png",
      description: "Description text example",
    });
    newmember.save();
    memberId = newmember.id;
  });

  after(async function deleteMember() {
    await Members.destroy({
      where: {
        id: memberId,
      },
      force: true,
    });
  });

  describe("Get all members", () => {
    it("Should get members information if logged as Admin at {server}/members", (done) => {
      chai
        .request(server)
        .get(`/members`)
        .set("authorization", "Bearer " + accessTokenAdmin)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          done();
        });
    });

    it("Should get 'Forbidden' message if not logged at {server}/members", (done) => {
      chai
        .request(server)
        .get(`/members`)
        .end((err, res) => {
          console.log(res.text);
          expect(res).to.have.status(401);
          done();
        });
    });

    it("Should get 'Forbidden' message if logged as Standard User at {server}/members", (done) => {
      chai
        .request(server)
        .get(`/members`)
        .set("authorization", "Bearer " + accessTokenStandar)
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.text).to.equal("Forbidden");
          done();
        });
    });
  });

  describe("Get member by id", () => {
    it("Should get member by ID if exist at {server}/members/{id}", (done) => {
      chai
        .request(server)
        .get(`/members/${memberId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          done();
        });
    });
  });

  describe("Post create new member", () => {
    it("Should get error if member name is empty {server}/members", (done) => {
      sandbox.stub(newmember, "name").value("");
      chai
        .request(server)
        .post(`/members`)
        .set("authorization", "Bearer " + accessTokenAdmin)
        .end((err, res) => {
          expect(res).to.have.status(400);
          sandbox.restore();
          done();
        });
    });

    it("Should get error if not logged as Admin {server}/members", (done) => {
      chai
        .request(server)
        .post(`/members`)
        .set("authorization", "Bearer " + accessTokenStandar)
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.text).to.equal("Forbidden");
          done();
        });
    });

    it("Should get error if not logged {server}/members", (done) => {
      chai
        .request(server)
        .post(`/members`)
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });
  });

  describe("Put update member", () => {
    it("Should update member info found by id {server}/members/id", (done) => {
      sandbox.stub(newmember, "name").value("newMember2");
      chai
        .request(server)
        .put(`/members/${memberId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          sandbox.restore();
          done();
        });
    });

    it("Should get error if member doesn't exist {server}/members", (done) => {
      chai
        .request(server)
        .post(`/members/asd`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });

  describe("Delete member", () => {
    it("Should delete member found by id {server}/members/id", (done) => {
      chai
        .request(server)
        .delete(`/members/${memberId}`)
        .set("authorization", "Bearer " + accessTokenAdmin)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          done();
        });
    });

    it("Should get error if member doesn't exist {server}/members", (done) => {
      chai
        .request(server)
        .delete(`/members/asd`)
        .set("authorization", "Bearer " + accessTokenAdmin)
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });

    it("Should get error if logged as Standar User {server}/members", (done) => {
        chai
          .request(server)
          .delete(`/members/asd`)
          .set("authorization", "Bearer " + accessTokenStandar)
          .end((err, res) => {
            expect(res).to.have.status(403);
            expect(res.text).to.equal("Forbidden")
            done();
          });
      });


    it("Should get error if not logged {server}/members", (done) => {
        chai
          .request(server)
          .delete(`/members/asd`)
          .end((err, res) => {
            expect(res).to.have.status(401);
            done();
          });
      });
  });
});
