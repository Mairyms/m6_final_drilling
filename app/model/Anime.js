const op = require("../utils/operaciones.js");

class Anime {
    constructor({ id, nombre, genero, año, autor }){
        this.id = id;
        this.nombre = nombre;
        this.genero = genero;
        this.año = año;
        this.autor = autor;
    }

    static async findAll() {
        return new Promise(async (resolve, reject) => {
            try {
                let respuesta = await op.leerAnimes();
                resolve(respuesta);
            } catch (error) {
                reject(error);
            }
        });
    }

    static async findById(id) {
        return new Promise(async (resolve, reject) => {
            try {
                let respuesta = await op.leerAnimes();
                const anime = respuesta[id];                
                if (anime) {
                    resolve(anime);
                } else {
                    reject('Anime no encontrado')
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    static async findByName(name) {
        return new Promise(async (resolve, reject) => {
            try {
                let respuesta = await op.leerAnimes();
                const anime = Object.values(respuesta).find((anime) => anime.nombre === name)
                
                if (anime) {
                    resolve(anime);
                } else {
                    reject('Anime no encontrado')
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    static async borrarAnime(id) {
        return new Promise(async (resolve, reject) => {
            try {
                let respuesta = await op.borrarAnime(id);
                resolve(respuesta);
            } catch (error) {
                reject(error);
            }
        });        
    }

    async addAnime() {
        return new Promise(async (resolve, reject) => {
            try {
                let anime = {
                    nombre: this.nombre,
                    genero: this.genero,
                    año: this.año,
                    autor: this.autor,
                };
                
                const respuesta = await op.agregarAnime(anime);
                resolve(respuesta);
            } catch (error) {
                reject(error);
            }            
        })
    }

    async updateAnime() {
        return new Promise(async (resolve, reject) => {
            try {
                let anime = {
                    nombre: this.nombre,
                    genero: this.genero,
                    año: this.año,
                    autor: this.autor,
                };
                
                const respuesta = await op.actualizarAnime(this.id, anime);
                resolve(respuesta);
            } catch (error) {
                reject(error);
            }            
        }) 
    }
}

module.exports = Anime;