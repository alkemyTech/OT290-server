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
    .get("/activities")
    .set("authorization", "Bearer " + get.body.accessToken);
  //Consiguiendo el ultimo elemento creado
  let listC = getC.body;
  let contact = listC.pop();
  return { get, getC, contact };
};

//Descripcion de la suit de pruebas para contact
describe("main suite: Test de pruebas para enpoint activities", () => {
  describe("Caso 1 - GET activities", () => {
    it("Comprueba que sucede en caso de que no estar autenticado", async () => {
      //Consiguien response sin autenticacion
      let res = await agent.get("/activities");
      //Confirmaciones
      expect(res).to.have.status(200);
    });
  });

  describe("Caso 2 - GET activities datos", () => {
    it("Validacion tipo de datos recivios en response", async () => {
      let datos = await conseguirDatos();
      let getContact = datos.getC;
      getContact.body.forEach((contact) => {
        assert.typeOf(contact.id, "number", "El tipo de dato esperado es un string");
        assert.typeOf(contact.name, "string", "El tipo de dato esperado es un string");
        assert.typeOf(contact.image, "string", "El tipo de dato esperado es un number");
        assert.typeOf(contact.content, "string", "El tipo de dato esperado es un string");
        //assert.typeOf(contact.message, "text");
      });
    });
  });

  describe("Caso 3 - POST activities creacion de actividad ", () => {
    it("Comprueba la creacion de un actividad", async () => {
      let datos = await conseguirDatos();
      let token = datos.get.body.accessToken;
      let res = await agent
        .post("/activities")
        .set("authorization", "Bearer " + token)
        .send({
          name: "usuarioP",
          image: "aaqui va una imagen",
          content: "Esto es un contenido",
        });
      //Confirmaciones
      expect(res).to.have.status(201);
      expect(res.body).to.have.contains(Object);
    });
  });

  describe("Caso 4 - POST avtivitie fala de capos ", () => {
    it("Comprueba la creacion de un actividades cuando faltan campos", async () => {
      let datos = await conseguirDatos();
      let token = datos.get.body.accessToken;
      let res = await agent
        .post("/activities")
        .set("authorization", "Bearer " + token)
        .send({
          name: "",
          image: "aaqui va una imagen",
          content: "Esto es un contenido",
        });

      //Confirmaciones
      expect(res).to.have.status(400);
    });
  });

  describe("Caso 5 - PUT activities ", () => {
    it("Comprueba la actualizacion de una actividad", async () => {
      let datos = await conseguirDatos();
      let token = datos.get.body.accessToken;
      let res = await agent
        .put("/activities/1")
        .set("authorization", "Bearer " + token)
        .send({
          name: "123",
          image: "aaqui va una imagen",
          content: "Esto es un contenido",
        });

      //Confirmaciones
      expect(res).to.have.status(200);
    });
  });

  describe("Caso 6 - PUT activities id incorrecto", () => {
    it("Comprueba la actualizacion de una actividad en caso de id incorrecto", async () => {
      let datos = await conseguirDatos();
      let token = datos.get.body.accessToken;
      let res = await agent
        .put("/activities/1000")
        .set("authorization", "Bearer " + token)
        .send({
          name: "1234",
          image: "aaqui va una imagen",
          content: "Esto es un contenido",
        });
      //Confirmaciones
      expect(res).to.have.status(404);
    });
  });
});
