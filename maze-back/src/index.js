const config = require('../config/config');
const MazeBuilder = require('./mazeBuilder');
const Solver = require('./solver');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = config.development.port;

app.use(bodyParser.json());
app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

let maze = new MazeBuilder();

app.get('/', (_, res) => res.send('Hello World'));

app.post('/initGrid', (req, res) => {

    const size = req.body.size ? parseInt(req.body.size) : 21;
    const showSteps = req.body.showSteps ? req.body.showSteps : false;

    maze.setSize(size)
        .initGrid()
        .buildLabyrinth(showSteps);
    if(showSteps){
        res.send(maze.visualization)
    }
    else res.send(maze.grid)
});

app.post('/solve', (req, res) => {
    let solver = new Solver(maze.grid);
    solver.solve(maze.grid);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

maze.setSize(11,11)
    .initGrid()
    .buildLabyrinth()
    .saveToTxt('../out/output.json');

let solver = new Solver(maze.grid);
console.log(solver.solve(maze.grid));

