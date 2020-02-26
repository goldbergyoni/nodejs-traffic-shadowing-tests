const fs = require('fs').promises;
const path = require('path');
const s3 = require('s3');

module.exports = async () => {
    await downloadHarFromCloud(7, "har", "production-har-files");
    await SaveInSingleJson("production-har-files", "production-inputs.json");
};

const downloadHarFromCloud = async (howLongInDays, extensions, folderName) => {
    return new Promise((resolve, reject) => {
        const client = s3.createClient({
            maxAsyncS3: 20, // this is the default
            s3RetryCount: 3, // this is the default
            s3RetryDelay: 1000, // this is the default
            multipartUploadThreshold: 20971520, // this is the default (20 MB)
            multipartUploadSize: 15728640, // this is the default (15 MB)
            s3Options: {
                accessKeyId: "",
                secretAccessKey: "",
            },
        });

        const params = {
            localDir: `./tests/${folderName}`,
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

            reject(err);
        });
        downloader.on('progress', function () {

        });
        downloader.on('end', function () {

            resolve();
        });

    });

}

const SaveInSingleJson = async (folderName, outputFileName, filterMethod) => {

    const allRequests = [];

    const allHarFiles = await fs.readdir(`./tests/${folderName}`, {
        withFileTypes: true
    });

    for (let index = 0; index < allHarFiles.length; index++) {
        const fileToProcess = allHarFiles[index];
        if ((path.extname(fileToProcess.name) !== ".har")) {
            continue;
        }

        const fileContent = await fs.readFile(path.join(`./tests/${folderName}`, fileToProcess.name), {
            encoding: 'utf8'
        });

        if (fileContent.trim()) {
            const fileContentAsJSON = JSON.parse(fileContent);
            fileContentAsJSON.log.entries.forEach((aRecordedRequest) => {
                allRequests.push([aRecordedRequest.request.url, aRecordedRequest.response.status, aRecordedRequest.request.postData.text, ]);
            });
        }
    }

    // await fs.writeFile(path.join(__dirname, outputFileName), JSON.stringify({
    //     all: allRequests
    // }), {
    //     encoding: 'utf8',
    //     flag: 'w'
    // });

}