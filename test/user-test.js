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
  let getU = await agent
    .get("/users")
    .set("authorization", "Bearer " + get.body.accesToken);
  //Consiguiendo el ultimo elemento creado
  let listU = getU.body;
  let user = listU.pop();
  return { get, getU, user };
};

//Descripcion de la suit de pruebas para contact
describe("main suite: Test de pruebas para enpoint user", () => {
  describe("Caso 1 - GET user sin autenticacion", () => {
    it("Comprueba que sucede en caso de que no estar autenticado", async () => {
      //Consiguien response sin autenticacion
      let res = await agent.get("/users");

      //Confirmaciones
      expect(res).to.have.status(403);
      assert.equal(
        res.text,
        "Forbidden",
        "getUser.txt tiene que ser igual `Forbidden`"
      );
    });
  });
  describe("Caso 2 - GET user", () => {
    it("Comprueba el response de contact", async () => {
      let datos = await conseguirDatos();
      let getUser = datos.getU;

      //Confirmaciones
      expect(getUser).to.have.status(200);
      getContact.body[0].should.be.a("object");
    });
  });
  describe("Caso 3 - GET user datos", () => {
    it("Validacion tipo de datos recibidos en response", async () => {
      let datos = await conseguirDatos();
      let getUser = datos.getU;
      getUser.body.forEach((user) => {
        assert.typeOf(
          user.id,
          "number",
          "El tipo de dato esperado es un number"
        );
        assert.typeOf(
          user.firstName,
          "string",
          "El tipo de dato esperado es un string"
        );
        assert.typeOf(
          user.lastName,
          "string",
          "El tipo de dato esperado es un string"
        );
        assert.typeOf(
          user.email,
          "string",
          "El tipo de dato esperado es un string"
        );
        assert.typeOf(
          user.password,
          "string",
          "El tipo de dato esperado es un string"
        );
        assert.typeOf(
          user.photo,
          "string",
          "El tipo de dato esperado es un string"
        );    
        assert.typeOf(
          user.roleId,
          "number",
          "El tipo de dato esperado es un number"
        );
      });
    });
  });
  describe("Caso 4 - GET user id correcto", () => {
    it("Comprueba el response de user con id correcto", async () => {
      let datos = await conseguirDatos();
      let token = datos.get.body.accesToken;
      let res = await agent
        .get("/user/1")
        .set("authorization", "Bearer " + token);

      //Confirmaciones
      expect(res).to.have.status(200);
      expect(res.body).to.have.contains(Object);
    });
  });
  describe("Caso 5 - GET user id incorrecto", () => {
    it("Comprueba el response de contact con id incorrecto", async () => {
      let datos = await conseguirDatos();
      let token = datos.get.body.accesToken;
      let res = await agent
        .get("/user/1000")
        .set("authorization", "Bearer " + token);

      //Confirmaciones
      expect(res).to.have.status(404);
      expect(res.body).to.have.contains(Object);
    });
  });
  describe("Caso 6 - POST user creacion de contacto ", () => {
    it("Comprueba la creacion de un contacto", async () => {
      let datos = await conseguirDatos();
      let token = datos.get.body.accesToken;
      let res = await agent
        .post("/users")
        .set("authorization", "Bearer " + token)
        .send({
          firstName: "John",
          lastName: "Doe",
          email: "johndoe@mail.com",
          password: "secure123",
          photo: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
          roleId: 2
        });
      //Confirmaciones
      expect(res).to.have.status(200);
      expect(res.body).to.have.contains(Object);
    });
  });
  describe("Caso 7 - POST user falta de capos ", () => {
    it("Comprueba la creacion de un contacto cuando faltan campos", async () => {
      let datos = await conseguirDatos();
      let token = datos.get.body.accesToken;
      let res = await agent
        .post("/users")
        .set("authorization", "Bearer " + token)
        .send({
          firstName: "", //Campo faltante para prueba
          lastName: "Doe",
          email: "johndoe@mail.com",
          password: "secure123",
          photo: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
          roleId: 2
        });

      //Confirmaciones
      expect(res).to.have.status(400);
    });
  });
  describe("Caso 8 - PUT user ", () => {
    it("Comprueba la actualizacion de un usuario", async () => {
      let datos = await conseguirDatos();
      let token = datos.get.body.accesToken;
      let res = await agent
        .put("/users/1")
        .set("authorization", "Bearer " + token)
        .send({
            firstName: "Jack",
            lastName: "Daniels",
            email: "jackdaniels@mail.com",
            password: "secure123",
            photo: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
            roleId: 2
        });

      //Confirmaciones
      expect(res).to.have.status(200);
    });
  });
  describe("Caso 9 - PUT user id incorrecto", () => {
    it("Comprueba la actualizacion de un contacto en caso de id incorrecto", async () => {
      let datos = await conseguirDatos();
      let token = datos.get.body.accesToken;
      let res = await agent
        .put("/userss/1000")
        .set("authorization", "Bearer " + token)
        .send({
            firstName: "Jack",
            lastName: "Daniels",
            email: "jackdaniels@mail.com",
            password: "secure123",
            photo: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
            roleId: 2
        });
      //Confirmaciones
      expect(res).to.have.status(404);
    });
  });
  describe("Caso 10 - DELETE user id correcto", () => {
    it("Eliminar un contacto id correcto", async () => {
      let datos = await conseguirDatos();
      let token = datos.get.body.accesToken;
      let id = datos.users.id;
      let res = await agent
        .delete(`/users/${id}`)
        .set("authorization", "Bearer " + token);

      //Confirmaciones
      expect(res).to.have.status(200);
    });
  });
  describe("Caso 11 - DELETE user id incorrecto", () => {
    it("Eliminar un contacto id incorrecto", async () => {
      let datos = await conseguirDatos();
      let token = datos.get.body.accesToken;
      let res = await agent
        .delete("/users/1000")
        .set("authorization", "Bearer " + token);

      //Confirmaciones
      expect(res).to.have.status(404);
    });
  });
});