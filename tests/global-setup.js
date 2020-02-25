const fs = require('fs').promises;
const path = require('path');
const s3 = require('s3');

module.exports = async () => {
    console.log('Starting');
    const allRequests = [];

    await downloadHarFromCloud(7, "har");
    console.log('Setup end');
};

const downloadHarFromCloud = async (howLongInDays, extensions) => {
    return new Promise((resolve, reject) => {
        const client = s3.createClient({
            maxAsyncS3: 20, // this is the default
            s3RetryCount: 3, // this is the default
            s3RetryDelay: 1000, // this is the default
            multipartUploadThreshold: 20971520, // this is the default (20 MB)
            multipartUploadSize: 15728640, // this is the default (15 MB)
            s3Options: {
                accessKeyId: "AKIATXKTWUIGFAXR47MX",
                secretAccessKey: "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",
            },
        });

        const params = {
            localDir: "./tests/production-har-files",
            deleteRemoved: true, // default false, whether to remove s3 objects
            // that have no corresponding local file.

            s3Params: {
                Bucket: "car-garage-traffic-shadow",
                Prefix: "",
                // other options supported by putObject, except Body and ContentLength.
                // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property
            },
        };
        const downloader = client.downloadDir(params);
        downloader.on('error', function (err) {
            console.error("unable to sync:", err.stack);
            reject(err);
        });
        downloader.on('progress', function () {
            console.log("progress", downloader.progressAmount, downloader.progressTotal);
        });
        downloader.on('end', function () {
            console.log("done downloading");
            resolve();
        });

    });

}

const SaveInSingleJson = async (filterMethod) => {
    const allHarFiles = await fs.readdir("./tests/production-har-files", {
        withFileTypes: true
    });

    for (let index = 0; index < allHarFiles.length; index++) {
        const fileToProcess = allHarFiles[index];
        if ((path.extname(fileToProcess.name) !== ".har")) {
            continue;
        }

        const fileContent = await fs.readFile(path.join('./tests/production-har-files', fileToProcess.name), {
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

}