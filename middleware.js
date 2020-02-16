var gor = require("goreplay_middleware");
// `init` will initialize STDIN listener
gor.init();
console.error("Starting");
gor.on("request", function(req) {
    console.error("Request");
    gor.on("response", req.ID, function(resp) {
        console.error('Response', resp.http);
        gor.on("replay", req.ID, function(repl) {
            console.error('Replay', repl.http);
            if (gor.httpStatus(resp.http) != gor.httpStatus(repl.http)) {
                // Note that STDERR is used for logging, and it actually will be send to `Gor` STDOUT.
                // This trick is used because SDTIN and STDOUT already used for process communication.
                // You can write logger that writes to files insead.
                console.error(`${gor.httpPath(req.http)} STATUS NOT MATCH: 'Expected ${gor.httpStatus(resp.http)}' got '${gor.httpStatus(repl.http)}'`)
            }
            return repl;
        })
        return resp;
    })
    return req;
})

//sudo ./gor --input-raw :8000 --output-http-track-response --input-raw-track-response --middleware "node /Users/yonigoldberg/Solutions/shadowing/prod-replay-demo/middleware" --output-http http://localhost:8001