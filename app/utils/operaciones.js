const fs = require("fs");
const path = require("path");

const pathAnime = path.resolve(__dirname, "../db/anime.json");

const leerAnimes = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(pathAnime, "utf8", (error, data) => {
            if (error) {
                reject("Error al acceder a la información de animes");
            }
            if (data == null) {
                reject("Error al acceder a la información de animes");
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
};

const agregarAnime = async (anime) => {
    return new Promise(async (resolve, reject) => {
        let data = await leerAnimes();
        let ids = Object.keys(data)
        for (let i = 0; i < ids.length; i++) {
            ids[i] = parseInt(ids[i])
        }
        const id = Math.max(...ids) + 1;
        data[id] = anime;
        
        fs.writeFile(pathAnime, JSON.stringify(data, null, 4), "utf8", (error) => {
            if (error) {
                reject(`Error al intentar agregar el anime con nombre ${anime.nombre}.`);
            }
            
            resolve(`Anime ${anime.nombre} guardado con éxito.`);
        });
    })
};

const actualizarAnime = async (id, anime) => {
    return new Promise(async (resolve, reject) => {
        let data = await leerAnimes();
        const animeModificado = data[id]

        if (animeModificado) {
            data[id] = anime;
        } else {
            reject("Anime no encontrado")
        }

        fs.writeFile(pathAnime, JSON.stringify(data, null, 4), "utf8", (error) => {
            if (error) {
                reject("Error al actualizar el archivo.");
            }
            resolve("Se ha guardado correctamente la información");
        });
    })
};

const borrarAnime = async (id) => {
    return new Promise(async (resolve, reject) => {
        let data = await leerAnimes();
        const anime = data[id];
        if (anime) {
            delete data[id];
        } else {
            reject("Anime no encontrado")
        }
        
        fs.writeFile(pathAnime, JSON.stringify(data, null, 4), "utf8", (error) => {
            if (error) {
                reject("Error al actualizar el archivo.");
            }
            resolve("Se ha eliminado correctamente el anime");
        });
    })
};

module.exports = {
    leerAnimes,
    agregarAnime,
    actualizarAnime,
    borrarAnime
};