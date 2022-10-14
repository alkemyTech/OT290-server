const chai = require("chai"),
  chaiHttp = require("chai-http");
chai.use(chaiHttp);
const login = require("../controllers/auth");
const assert = chai.assert;
const should = chai.should();
const expect = require("chai").expect;
const server = require("../app");
let agent = chai.request.agent(server);
//result

describe("main suite", () => {
  describe("Caso 1 - GET contact", () => {
    it("Comprueba que el status code sea correcto", async () => {
      //consiguiendo la autorizacion
      let get = await agent
        .post("/auth/login")
        .send({ email: "adminUser5@test.com", password: "##StrongPassword05" });

      //consiguiendo los contactos
      let getC = await agent
        .get("/contacts")
        .set("authorization", "Bearer " + get.body.accesToken);

      expect(getC).to.have.status(200);
    });

    describe("Caso 2 - GET contact", () => {
      it("Validacion tipo de dato", async () => {
        //consiguiendo la autorizacion
        let get = await agent.post("/auth/login").send({
          email: "adminUser5@test.com",
          password: "##StrongPassword05",
        });

        //consiguiendo los contactos
        let getC = await agent
          .get("/contacts")
          .set("authorization", "Bearer " + get.body.accesToken);

        getC.body.forEach((contact) => {
          assert.typeOf(
            contact.id,
            "number",
            "El tipo de dato esperado es un string"
          );
          assert.typeOf(
            contact.name,
            "string",
            "El tipo de dato esperado es un string"
          );
          assert.typeOf(
            contact.phone,
            "number",
            "El tipo de dato esperado es un number"
          );
          assert.typeOf(
            contact.email,
            "string",
            "El tipo de dato esperado es un string"
          );
          //assert.typeOf(contact.message, "text");
        });
      });
    });
  });
});
