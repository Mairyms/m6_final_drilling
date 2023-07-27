const chai = require("chai");
const chaihttp = require("chai-http");
const app = require("../app/server.js");
const assert = chai.assert;

chai.use(chaihttp);

describe("PRUEBAS DE API DE DE ANIME", () => {
    let servidor = app.listen(3000);
    describe("probar ruta /api/v1/anime con MÉTODO GET", () => {
        it("Validar respuesta de la ruta de animes.", (done) => {
            chai.request(servidor)
                .get("/api/v1/anime")
                .end((error, res) => {
                    assert.equal(res.status, 200, "Código de estado corresponde.")
                    assert.isObject(res.body, "Respuesta debe ser un objeto")
                    assert.equal(res.body.code, 200, "Código de estado el body es 200.")
                    assert.exists(res.body.message, "Existe la propiedad message");
                });
            done();
        })
    })
})