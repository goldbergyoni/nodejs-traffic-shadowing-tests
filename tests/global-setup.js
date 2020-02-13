const fs = require('fs').promises;
const path = require('path');

module.exports = async () => {
    console.log('Starting');
    const allRequests = [];

    const allHarFiles = await fs.readdir("./request-records-har/", {
        withFileTypes: true
    });
    for (let index = 0; index < allHarFiles.length; index++) {
        const fileName = allHarFiles[index];
        if (!(path.extname(fileName.name) === ".har")) {
            continue;
        }
        const fileContent = await fs.readFile(path.join('./request-records-har', fileName.name), {
            encoding: 'utf8'
        });
        //console.log(fileContent);
        const fileContentAsJSON = JSON.parse(fileContent);
        fileContentAsJSON.log.entries.forEach((aRecordedRequest) => {
            allRequests.push([aRecordedRequest.request.url, aRecordedRequest.request.postData.text, aRecordedRequest.response.status]);
        })
    }
    console.log("ready2", allRequests.length);
    await fs.writeFile(path.join(__dirname, "production-requests.json"), JSON.stringify({
        productionRequests: allRequests
    }));
    console.log("loo")
};