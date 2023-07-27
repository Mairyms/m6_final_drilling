const express = require('express');
const Anime = require('./model/Anime');

const app = express();

app.use(express.json()); // recibirá los datos por parte cliente en el req.body

const port = 3000;


app.get('/api/v1/anime', async (req, res)=> {
    try {
        const animes = await Anime.findAll();
        res.status(200).send({ code: 200, message: "OK", data: animes });
    } catch (error) {
        res.status(500).send({ code: 500, message: error });
    }
});

app.post("/api/v1/anime", async (req, res) => {
    try {
        let { nombre, genero, año, autor } = req.body;
        let nuevoAnime = new Anime({ nombre, genero, año, autor });
        let resultado = await nuevoAnime.addAnime();
        res.status(201).send({ code: 201, message: resultado });
    } catch (error) {
        res.status(500).send({ code: 500, message: error });
    }
});

app.get('/api/v1/anime/:id', async (req, res)=> {
    try {
        const id = req.params["id"];
        let resultado
        
        if (!isNaN(id)) {
            resultado = await Anime.findById(id);
        } else {
            resultado = await Anime.findByName(id);
        }
        res.status(200).send({ code: 200, message: "OK", data: resultado });
    } catch (error) {
        res.status(500).send({ code: 500, message: error });
    }    
});

app.put("/api/v1/anime/:id", async (req, res) => {
    try {
        const id = req.params.id;
        let { nombre, genero, año, autor } = req.body;
        let animeModificado = new Anime({ id, nombre, genero, año, autor });
        let resultado = await animeModificado.updateAnime();
        res.status(200).send({ code: 200, message: resultado });
    } catch (error) {
        res.status(500).send({ code: 500, message: error });
    }
});

app.delete('/api/v1/anime/:id', async (req, res)=> {
    try {
        const id = req.params["id"];       
        const respuesta  = await Anime.borrarAnime(id)
        res.status(204).send({ code: 204, message: respuesta });
    } catch (error) {
        res.status(500).send({ code: 500, message: error });
    }
});

module.exports = app;