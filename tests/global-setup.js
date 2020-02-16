const fs = require('fs').promises;
const path = require('path');

module.exports = async () => {
    return;
    console.log('Starting');
    const allRequests = [];

    const allHarFiles = await fs.readdir("./request-records-har/", {
        withFileTypes: true
    });

    for (let index = 0; index < allHarFiles.length; index++) {
        const fileToProcess = allHarFiles[index];

        // if (fileToProcess.name.trim() !== "1581608521677-undefined.har") {
        //     continue;
        // }

        if ((path.extname(fileToProcess.name) !== ".har")) {
            continue;
        }

        const fileContent = await fs.readFile(path.join('./request-records-har', fileToProcess.name), {
            encoding: 'utf8'
        });

        if (fileContent.trim()) {
            const fileContentAsJSON = JSON.parse(fileContent);
            fileContentAsJSON.log.entries.forEach((aRecordedRequest) => {
                allRequests.push([aRecordedRequest.request.url, aRecordedRequest.response.status, aRecordedRequest.request.postData.text, ]);
            });
        }
    }

    await fs.writeFile(path.join(__dirname, "production-requests.json"), JSON.stringify({
        all: allRequests
    }), {
        encoding: 'utf8',
        flag: 'w'
    });
};