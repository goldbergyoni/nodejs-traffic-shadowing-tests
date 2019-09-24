const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const port = process.argv[2] || 8000;
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static('public'));

const connections = [];
const state = { ferrari: 0, fiat: 0, skoda:0, alfaRomeo:0, vespa:0, tesla:0, audi:0 };

app.get('/vote/cats', (_req, res) => {
    console.log('A vote for 🐱');
    addVotes({ cats: 1 });
    res.sendStatus(200);
});

app.get('/vote/dogs', (_req, res) => {
    console.log('A vote for 🐶');
    addVotes({ dogs: 1 });
    res.sendStatus(200);
});

wss.on('connection', (ws) => {
    connections.push(ws);
    ws.send(JSON.stringify(state));
});

const addVotes = ({ cats = 0, dogs = 0 }) => {
    state.cats = state.cats + cats;
    state.dogs = state.dogs + dogs;
    connections.forEach(ws => ws.send(JSON.stringify(state)));
};

server.listen(port, () => console.log(`Demo app listening on port ${port}!`));