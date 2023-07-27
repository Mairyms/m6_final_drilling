const chai = require("chai");
const chaihttp = require("chai-http");
const app = require("../app/server.js");
const assert = chai.assert;

chai.use(chaihttp);

describe("PRUEBAS DE API DE DE ANIME", () => {
    let servidor = app.listen(3000);

    describe("probar ruta /api/v1/anime/:id con MÉTODO PUT", () => {
        it("Validar respuesta de la ruta de anime.", (done) => {
            chai.request(servidor)
                .put("/api/v1/anime/1")
                .send({
                    "nombre": "Prueba",
                    "genero": "prueba",
                    "año":"1999",
                    "autor":"Autor"
                })
                .end((error, res) => {
                    assert.equal(res.status, 200, "Código de estado corresponde.")

                    assert.isObject(res.body, "Respuesta debe ser un objeto")
                    assert.equal(res.body.code, 200, "Código de estado el body es 200.")
                    assert.exists(res.body.message, "Existe la propiedad message");
                    assert.equal(res.body.message, "Se ha guardado correctamente la información");

                    chai.request(servidor)
                        .put("/api/v1/anime/1")
                        .send({
                            "nombre": "Akira",
                            "genero": "Seinen",
                            "año": "1988",
                            "autor": "Katsuhiro Otomo"
                        })
                        .end()
                });
            done();
        })
    })
})