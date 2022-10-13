const chai = require("chai"),
  chaiHttp = require("chai-http");
chai.use(chaiHttp);
const login = require("../controllers/auth");
const assert = chai.assert;
const should = chai.should();
const expect = chai.expect;
const server = require("../app");
let agent = chai.request.agent(server);
//result

describe("main suite", () => {
  it("deberia debolver todos los contactos", async () => {
    agent
      .post("/auth/login")
      .send({
        email: "adminUser5@test.com",
        password: "##StrongPassword05",
      })
      .then(function (res) {
        expect(res).to.have.status(200);
        agent
          .get("/contacts")
          .set("authorization", "Bearer " + res.body.accesToken)
          .then(function (res, err) {
          });
      });
    agent.close();
  });
});
