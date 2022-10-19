var assert = require("assert");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");
let should = chai.should();

chai.use(chaiHttp);

let testCreatedId;

describe("/GET testimonials", () => {
  it("Debera realizar GET a testimonials, recibir una respesta de estado 200, un arreglo de items con o sin elementos ", (done) => {
    chai
      .request(server)
      .get("/testimonials")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.items.should.be.a("array");
        done();
      });
  });
});

// GET DE TESTIMONIO UNICO
describe("/GET testimonials", () => {
  let testId = 1;
  it("Debera realizar GET a testimonials para recibir un unico item existente, recibir una respuesta de estado 200 con id numerico y campo deletedAt en null", (done) => {
    chai
      .request(server)
      .get(`/testimonials/${testId}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("id").and.to.be.a("number");
        res.body.should.have.property("deletedAt").and.to.be.null;
        done();
      });
  });
});

// GET DE TESTIMONIO UNICO ERRONEO
describe("/GET testimonials", () => {
  let testId = -1;
  it("Debera realizar GET a testimonials por un id inexistente, recibir una respuesta de estado 404", (done) => {
    chai
      .request(server)
      .get(`/testimonials/${testId}`)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});

/** TESTING ERROR POST */
describe("/POST testimonials", () => {
  it("Deberia realizar POST vacio a testimonials y recibir error 400", (done) => {
    chai
      .request(server)
      .post("/testimonials")
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

/** TESTING SUCCESS POST */
describe("/POST testimonials", () => {
  it("Deberia realizar POST vacio a testimonials y recibir un estado 201 de la creacion correcta del elemento", (done) => {
    chai
      .request(server)
      .post("/testimonials")
      .type("form")
      .send({
        name: "Testimonial X",
        image: "https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg",
        content: "Content random...",
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.property("id");
        testCreatedId = res.body.id;
        done();
      });
  });
});

// TESTING PUT SUCCESSFULL
describe("/PUT testimonials", () => {
  let testId = 1;
  let testName = "Testimonial X";
  let testImage = "https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg";
  let testContent = "Content random...";
  it("Deberia realizar PUT para editar testimonoio, recibir un estado 204 y body vacio", (done) => {
    chai
      .request(server)
      .put(`/testimonials/${testId}`)
      .type("form")
      .send({
        name: testName,
        image: testImage,
        content: testContent,
      })
      .end((err, res) => {
        res.should.have.status(204);
        res.body.should.be.a("object").that.is.empty;
        // res.body.should.have.property('id').and.be.equal(testId);
        // res.body.should.have.property('name').and.be.equal(testName);
        // res.body.should.have.property('image').and.be.equal(testImage);
        // res.body.should.have.property('content').and.be.equal(testContent);
        done();
      });
  });
});

// TESTING PUT ID INEXISTENTE
describe("/PUT testimonials", () => {
  let testId = -1;
  let testName = "Testimonial X";
  let testImage = "https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg";
  let testContent = "Content random...";
  it("Deberia realizar PUT para editar testimonoio inexistente, recibir un estado 404", (done) => {
    chai
      .request(server)
      .put(`/testimonials/${testId}`)
      .type("form")
      .send({
        name: testName,
        image: testImage,
        content: testContent,
      })
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});

// DELETING TESTIMONIO EXISTENTE

describe("/DELETE testimonials", () => {
  it("Deberia realizar DELETE de testimoio existente, recibir un estado 204 con body vacio", (done) => {
    let testName = "Testimonial X";
    let testImage = "https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg";
    let testContent = "Content random...";
    chai
      .request(server)
      .delete(`/testimonials/${testCreatedId}`)
      .end((err, res) => {
        res.should.have.status(204);
        res.body.should.be.a("object").that.is.empty;
        done();
      });
  });
});

// DELETING TESTIMONIO INEXISTENTE

describe("/DELETE testimonials", () => {
  let testId = -1;

  describe("deleting testimonial", () => {
    it("Deberia realizar DELETE de testimoio inexistente, recibir un estado 404", (done) => {
      chai
        .request(server)
        .delete(`/testimonials/${testId}`)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});
