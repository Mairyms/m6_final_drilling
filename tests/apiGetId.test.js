const chai = require("chai");
const chaihttp = require("chai-http");
const app = require("../app/server.js");
const assert = chai.assert;

chai.use(chaihttp);

describe("PRUEBAS DE API DE DE ANIME", () => {
    let servidor = app.listen(3000);

    describe("probar ruta /api/v1/anime/:id con MÉTODO GET y id", () => {
        it("Validar respuesta de la ruta de anime.", (done) => {
            chai.request(servidor)
                .get("/api/v1/anime/1")
                .end((error, res) => {
                    assert.equal(res.status, 200, "Código de estado corresponde.")
                    assert.isObject(res.body, "Respuesta debe ser un objeto")
                    assert.equal(res.body.code, 200, "Código de estado el body es 200.")
                    assert.exists(res.body.message, "Existe la propiedad message");

                    assert.exists(res.body.data, "Existe la propiedad data");
                    assert.equal(res.body.data.nombre, "Akira");
                    assert.equal(res.body.data.genero, "Seinen");
                    assert.equal(res.body.data["año"], "1988");
                    assert.equal(res.body.data.autor, "Katsuhiro Otomo");
                });
            done();
        })
    })
})