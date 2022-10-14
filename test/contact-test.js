const chai = require("chai"),
  chaiHttp = require("chai-http");
chai.use(chaiHttp);
const login = require("../controllers/auth");
const assert = chai.assert;
const should = chai.should();
const expect = require("chai").expect;
const server = require("../app");
let agent = chai.request.agent(server);

let conseguirDatos = async () => {
  //Consiguiendo el token necesario para validaciones
  let get = await agent
    .post("/auth/login")
    .send({ email: "adminUser5@test.com", password: "##StrongPassword05" });
  //Consiguiendo la respuesta del servidor para realizar validaciones
  let getC = await agent
    .get("/contacts")
    .set("authorization", "Bearer " + get.body.accesToken);
  //Consiguiendo la respuesta sin autenticacion
  let getCv = await agent.get("/contacts");
  return { getC, getCv };
};

//Descripcion de la suit de pruebas para contact
describe("main suite", () => {
  describe("Caso 1 - GET contact", () => {
    it("Comprueba el response de contact", async () => {
      let datos = await conseguirDatos();
      let getContact = datos.getC;

      //Confirmaciones
      expect(getContact).to.have.status(200);
      getContact.body[0].should.be.a("object");
    });
  });
  describe("Caso 2 - GET contact", () => {
    it("Validacion tipo de dato", async () => {
      let datos = await conseguirDatos();
      let getContact = datos.getC;
      getContact.body.forEach((contact) => {
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
  describe("Caso 3 - GET contact sin autenticacion", () => {
    it("Comprueba que sucede en caso de que no este autenticado", async () => {
      let datos = await conseguirDatos();
      let getContact = datos.getCv;
      //Confirmaciones
      expect(getContact).to.have.status(403);
      assert.equal(
        getContact.text,
        "Forbidden",
        "getContact.txt tiene que ser igual `Forbidden`"
      );
    });
  });
});
