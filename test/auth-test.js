const chai = require("chai"),
  chaiHttp = require("chai-http");
chai.use(chaiHttp);
const assert = chai.assert;
const should = chai.should();
const expect = require("chai").expect;
const server = require("../app");
let agent = chai.request.agent(server);

//Descripcion de la suit de pruebas para contact
describe("main suite: Test de pruebas para enpoint auth", () => {
  describe("Caso 1 - Registro exitoso", () => {
    it("Comprueba el response de registro correcto", async () => {
        let res = await agent
          .post("/auth/register")
          .send({
            firstName: "John",
            lastName: "Doe",
            email: "johndoe@mail.com",
            password: "secure123"
          });
        //Confirmaciones
        expect(res).to.have.status(201);
        expect(res.body).to.have.contains(Object);
    });
  });
  describe("Caso 2 - Registro fallido, email invalido", () => {
    it("Comprueba el response de registro con email invalido", async () => {
        let res = await agent
          .post("/auth/register")
          .send({
            firstName: "Johnny",
            lastName: "Walker",
            email: 43,
            password: "secure123"
          });
      expect(res).to.have.status(400);
    });
  });
  describe("Caso 3 - Login exitoso", () => {
    it("Comprueba el response de login correcto", async () => {
        let res = await agent
        .post("/auth/login")
        .send({ email: "johndoe@mail.com", password: "secure123" });
        //Confirmaciones
        expect(res).to.have.status(200);
        expect(res.body).to.have.contains(Object);
    });    

  });
  describe("Caso 4 - Login fallido, usuario no registrado", () => {
    it("Comprueba el response de login incorrecto por no estar registrado el usuario", async () => {
        let res = await agent
        .post("/auth/login")
        .send({ email: "johnnyboy@mail.com", password: "anotherpassword321" });
        //Confirmaciones
        expect(res).to.have.status(401.1);
        expect(res.body).to.equal("usuario no existe");
    });   
  });
  describe("Caso 5 - GET me correcto", () => {
    it("Comprueba el response al solicitar los datos del usuario registrado", async () => {
        let get = await agent
        .post("/auth/login")
        .send({ email: "adminUser5@test.com", password: "##StrongPassword05" });
        let res = await agent
        .get("/auth/me")
        .send({ email: "adminUser5@test.com", password: "##StrongPassword05" });
        //Confirmaciones
        expect(res).to.have.status(200);
        expect(res.body).to.have.contains(Object);
    });
  });
  describe("Caso 6 - GET me fallido, token incorrecto ", () => {
    it("Comprueba el response al solicitar los datos del usuario registrado sin el token correcto", async () => {
        let get = await agent
        .post("/auth/login")
        .send({ email: "adminUser5@test.com", password: "##StrongPassword05" });
        let res = await agent
        .get("/auth/me")
        .send({ email: "newuser@test.com", password: "###StrongerPassword055" });
        //Confirmaciones
        expect(res).to.have.status(404);
    });
  });
});