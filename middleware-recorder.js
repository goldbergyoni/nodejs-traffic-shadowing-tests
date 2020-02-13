const recorderMiddleware = (req, res, next) => {

});

const har = {
    log: {
        version: '1.1', // Version of HAR file-format
        creator: {
            name: 'node-express-har-capture',
            version: '1.0.0' // TODO: Get from package.json
            // comment: ""
        },
        pages: [],
        entries: entries
    }
};