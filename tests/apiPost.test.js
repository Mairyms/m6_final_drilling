const chai = require("chai");
const chaihttp = require("chai-http");
const app = require("../app/server.js");
const assert = chai.assert;

chai.use(chaihttp);

describe("PRUEBAS DE API DE DE ANIME", () => {
    let servidor = app.listen(3000);

    describe("probar ruta /api/v1/anime/ con MÉTODO POST", () => {
        it("Validar respuesta de la ruta de anime.", (done) => {
            chai.request(servidor)
                .post("/api/v1/anime/")
                .send({
                    "nombre": "Prueba",
                    "genero": "prueba",
                    "año":"1999",
                    "autor":"Autor"
                })
                .end((error, res) => {
                    assert.equal(res.status, 201, "Código de estado corresponde.")

                    assert.isObject(res.body, "Respuesta debe ser un objeto")
                    assert.equal(res.body.code, 201, "Código de estado el body es 201.")
                    assert.exists(res.body.message, "Existe la propiedad message");
                    assert.equal(res.body.message, "Anime Prueba guardado con éxito.");

                    chai.request(servidor)
                        .delete("/api/v1/anime/6")
                        .end()
                });         
            done();
        })
    })
})