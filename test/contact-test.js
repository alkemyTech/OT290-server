const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const should = chai.should();
const expect = chai.expect;
const controller = require("../controllers/contact");

//result

describe("main suite", async () => {
  const contacts = await controller.getContacts();
  it("deberia debolver todos los contactos", () => {
    console.log(contacts);
    assert.deepEqual(controller.getContacts, []);
  });
});
