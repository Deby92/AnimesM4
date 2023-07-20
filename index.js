const express = require('express');
const app = express();
const { v4:uuidv4 } = require('uuid');
const fs = require('fs/promises');

const PORT = 3000;
// http://localhost:3000/

app.get('/', async (req, res) => {
    try {
        const animesRaiz = JSON.parse(await fs.readFile(__dirname + '/animes.json'));
        res.status(200).json(animesRaiz);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'ERROR',
            message: error.message
        });
    }
    res.end();
});

// http://localhost:3000/read/1
app.get('/read/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const animesRaiz = JSON.parse(await fs.readFile(__dirname + '/animes.json'));
        const animes = animesRaiz[id];
        if (animes) {
            res.status(200).json(animes);
        } else {
            res.status(404).json({
                status: 'OK',
                message: 'No existe ese anime'
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'ERROR',
            message: 'error.messaje'
        });
    }
    res.end();
    
});
//http://localhost:3000/create?nombre=Akira&genero=Seinen&año=1988&autor=KatsuhiroOtomo
app.get('/create', async (req, res) => {
    try {
        const nombre = req.query.nombre;
        const genero = req.query.genero;
        const año = req.query.año;
        const autor = req.query.autor; 
        const animes = {
            nombre,
            genero,
            año,
            autor
        }
        const animesRaiz = JSON.parse(await fs.readFile(__dirname + '/animes.json'));
        const id = new String(Number(Object.keys(animesRaiz)[Object.keys(animesRaiz).length - 1]) + 1);
        animesRaiz[id] = animes;
        await fs.writeFile(__dirname + '/animes.json', JSON.stringify(animesRaiz));
        res.status(201).json(animesRaiz);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
    res.end();
    })
app.listen(PORT, () => console.log(`Iniciando en el puerto ${PORT}`));
