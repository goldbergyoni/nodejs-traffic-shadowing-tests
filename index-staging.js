const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const bodyParser = require('body-parser');
const expressHarRecorder = require('./middlewares/har-recorder');

const port = process.env.PORT || undefined; //That's OK, Express will randomize something for us
const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
if (process.env.RECORD_REQUESTS === 'true') {
    app.use(expressHarRecorder({
        sampleRate: 0.5,
        saveBody: true,
        harOutputDir: "request-records-har",
        excludeHeaders: ['Authorization'], //sanitize secrets here
        filter: (request) => request, //sanitize secrets here
        uploadToS3: true,
        uploadToS3IntervalInSeconds: 10,
        AWSToken: process.env.AWS_TOKEN
    }))
}

const server = http.createServer(app);
const wss = new WebSocket.Server({
    server
});

const connections = [];
const state = {
    ferrari: 0,
    fiat: 0,
    skoda: 0,
    alfaRomeo: 0,
    vespa: 0,
    tesla: 0,
    audi: 0
};

app.post('/event/:car', (req, res) => {
    try {
        console.log(`🚔 Car ${req.params.car} sent a msg ${JSON.stringify(req.body)}`);
        state[req.params.car]++;

        saveEventInDB(req.body);

        const result = processBusinessRules(req.body);

        notifySubscribers({
            messageType: 'stateUpdate',
            state
        });

        res.json(result).status(200);
    } catch (error) {
        console.error("Error occured", error);
        notifySubscribers({
            messageType: 'error'
        });
        res.sendStatus(500);
    }

});

const processBusinessRules = (msg) => {

    if (msg.engine.temperature > 120) {
        return {
            shutoff: true
        }
    }

    return {};
}


const shutOffTracker = (id) => {

}

const saveEventInDB = (msg) => {

}


wss.on('connection', (ws) => {
    connections.push(ws);
    console.log(process.env.ENVIRONMENT_NAME);
    ws.send(JSON.stringify({
        messageType: 'environmentName',
        environmentName: process.env.ENVIRONMENT_NAME
    }));
    ws.send(JSON.stringify(state));
});

const notifySubscribers = (message) => {
    connections.forEach(ws => ws.send(JSON.stringify(message)));
};

server.listen(port, () => console.log(`Demo app listening on port ${server.address().port}!`));

module.exports.expressApp = app;
module.exports.server = server;