const fs = require('fs').promises;
const path = require('path');

async function doit() {
    console.log("Starting");
    const allHarFiles = await fs.readdir("./request-records-har/", {
        withFileTypes: true
    });
    //const allHarFiles = ["1581605828548-undefined"];
    const allRequests = [];

    for (let index = 0; index < allHarFiles.length; index++) {
        const fileName = allHarFiles[index];
        if (!(path.extname(fileName.name) === ".har")) {
            console.log("no har");
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
    console.log("Ending");
    console.log(allRequests);

}

doit();