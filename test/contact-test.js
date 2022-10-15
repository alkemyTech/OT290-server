const chai = require("chai"),
  chaiHttp = require("chai-http");
chai.use(chaiHttp);
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

  return { get, getC };
};

//Descripcion de la suit de pruebas para contact
describe("main suite", () => {
  describe("Caso 1 - GET contact sin autenticacion", () => {
    it("Comprueba que sucede en caso de que no estar autenticado", async () => {
      //Consiguien response sin autenticacion
      let res = await agent.get("/contacts");

      //Confirmaciones
      expect(res).to.have.status(403);
      assert.equal(
        res.text,
        "Forbidden",
        "getContact.txt tiene que ser igual `Forbidden`"
      );
    });
  });
  describe("Caso 2 - GET contact", () => {
    it("Comprueba el response de contact", async () => {
      let datos = await conseguirDatos();
      let getContact = datos.getC;

      //Confirmaciones
      expect(getContact).to.have.status(200);
      getContact.body[0].should.be.a("object");
    });
  });
  describe("Caso 3 - GET contact datos", () => {
    it("Validacion tipo de datos recivios en response", async () => {
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
  describe("Caso 4 - GET contact id correcto", () => {
    it("Comprueba el response de contact con id correcto", async () => {
      let datos = await conseguirDatos();
      let token = datos.get.body.accesToken;
      let res = await agent
        .get("/contacts/1")
        .set("authorization", "Bearer " + token);

      //Confirmaciones
      expect(res).to.have.status(200);
      expect(res.body).to.have.contains(Object);
    });
  });
  describe("Caso 5 - GET contact id incorrecto", () => {
    it("Comprueba el response de contact con id incorrecto", async () => {
      let datos = await conseguirDatos();
      let token = datos.get.body.accesToken;
      let res = await agent
        .get("/contacts/1000")
        .set("authorization", "Bearer " + token);

      //Confirmaciones
      expect(res).to.have.status(404);
      expect(res.body).to.have.contains(Object);
    });
  });
  describe("Caso 6 - POST contact creacion de contacto ", () => {
    it("Comprueba la creacion de un contacto", async () => {
      let datos = await conseguirDatos();
      let token = datos.get.body.accesToken;
      let res = await agent
        .post("/contacts")
        .set("authorization", "Bearer " + token)
        .send({
          name: "usuarioP",
          phone: 123421,
          email: "usuariop@gmail.com",
          message: "Hola esto es una prueba",
        });
      //Confirmaciones
      expect(res).to.have.status(200);
      expect(res.body).to.have.contains(Object);
    });
  });
  describe("Caso 7 - POST contact fala de capos ", () => {
    it("Comprueba la creacion de un contacto cuando faltan campos", async () => {
      let datos = await conseguirDatos();
      let token = datos.get.body.accesToken;
      let res = await agent
        .post("/contacts")
        .set("authorization", "Bearer " + token)
        .send({
          name: "", //Campo faltante para prueba
          phone: 123421,
          email: "usuariop@gmail.com",
          message: "Hola esto es una prueba",
        });

      //Confirmaciones
      expect(res).to.have.status(400);
    });
  });
  describe("Caso 8 - PUT contact ", () => {
    it("Comprueba la actualizacion de un contacto", async () => {
      let datos = await conseguirDatos();
      let token = datos.get.body.accesToken;
      let res = await agent
        .put("/contacts")
        .set("authorization", "Bearer " + token)
        .send({
          name: "", //Campo faltante para prueba
          phone: 123421,
          email: "usuariop@gmail.com",
          message: "Hola esto es una prueba",
        });

      //Confirmaciones
      expect(res).to.have.status(400);
    });
  });
});
