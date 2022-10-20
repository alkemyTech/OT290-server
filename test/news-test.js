const chai = require("chai"),
    chaiHttp = require("chai-http");
chai.use(chaiHttp);
const assert = chai.assert;
const should = chai.should();
const expect = require("chai").expect;
const server = require("../app");
const agent = chai.request.agent(server);



describe("main suite: Test de pruebas para enpoint news", () => {
    describe("Caso 1 - GET news", () => {
        let res;
        it("Comprueba que obtiene estado 200", async () => {
            res = await agent.get("/news");
            expect(res).to.have.status(200);
        });
        it("Comprueba que obtiene al menos 1 dato", async () => {

            expect(res.body.data).to.be.length.greaterThan(1)
        });
        it("Comprueba que no contiene pagina anterior", async () => {

            expect(res.body.previous).to.be.null
        });

        it("Validacion tipo de datos en response", async () => {
            let newsData = res.body.data;
            newsData.forEach((news) => {
                assert.typeOf(
                    news.id,
                    "number"
                );
                assert.typeOf(
                    news.name,
                    "string"
                );
                assert.typeOf(
                    news.content,
                    "string"
                );
                assert.typeOf(
                    news.image,
                    "string"
                );
                assert.typeOf(
                    news.categoryId,
                    "number"
                );
            });
        });
    });




    let idPost = 0;
    describe("Caso 2 - Post news", () => {
        let res
        it("Comprueba la creacion de una news", async () => {

            res = await agent
                .post("/news")
                .send({
                    name: "nametest",
                    content: "new 123",
                    image: "Esto es una imagen",
                    categoryId: 1
                });
            expect(res).to.have.status(201);
            expect(res.body).to.have.contains(Object);
            idPost = res.body.id
        });
    })

    describe("Caso 2 - Get news con id Particular ", () => {
        let res;
        it("Comprueba la obtencion de una noticia", async () => {

            res = await agent
                .get("/news/" + idPost)

            expect(res).to.have.status(200);
            expect(res.body).to.have.contains(Object);
        });

        it("Validacion tipo de datos en response", async () => {
            let news = res.body;

            assert.typeOf(
                news.id,
                "number"
            );
            assert.typeOf(
                news.name,
                "string"
            );
            assert.typeOf(
                news.content,
                "string"
            );
            assert.typeOf(
                news.image,
                "string"
            );
            assert.typeOf(
                news.categoryId,
                "number"
            );

        });
    });

    describe("Caso 4 - POST noticia pero le faltan campos ", () => {
        it("Comprueba la no creacion de una noticia cuando faltan campos", async () => {


            let res = await agent
                .post("/news")
                .send({
                    categoryId: 1
                });
            expect(res).to.have.status(400);
        });
    });

    describe("Caso 5 - PUT news ", () => {
        it("Comprueba la actualizacion de una noticia", async () => {

            let res = await agent
                .put("/news/"+idPost)
                .send({
                    name: "12324",
                });

           
            expect(res).to.have.status(200);
        });
    });

    describe("Caso 6 - PUT news id incorrecto", () => {
        it("Comprueba la actualizacion de una noticia en caso de id incorrecto", async () => {

            let res = await agent
                .put("/news/1000")
               
                .send({
                    name: "12324",
                });
           
            expect(res).to.have.status(404);
        });
    });

    describe("Caso 7 - Delete news", () => {
        it("Comprueba el borrado de una noticia", async () => {

            let res = await agent
                .delete("/news/"+idPost)
             
           
            expect(res).to.have.status(200);
        });
    });

    describe("Caso 7 - Delete news id incorrecto", () => {
        it("Comprueba  el no borrado de una noticia en caso de id incorrecto", async () => {

            let res = await agent
                .delete("/news/15525")
             
           
            expect(res).to.have.status(404);
        });
    })
    describe("Caso 8 - Get news id incorrecto", () => {
        it("Comprueba la no obtencion de una noticia en caso de id incorrecto", async () => {

            let res = await agent
                .get("/news/15525")
             
           
            expect(res).to.have.status(404);
        });
    });
});
