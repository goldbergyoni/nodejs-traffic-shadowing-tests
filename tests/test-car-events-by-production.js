const request = require('supertest');
const express = require('express');
const sinon = require('sinon');
const nock = require('nock');
const uuid = require('uuid');
const fs = require('fs').promises;
const path = require('path');

const {
    server,
    expressApp
} = require('../index-production');

beforeAll(async (done) => {
    done()
});

afterAll(() => {
    if (server) {
        server.close();
    }
});


beforeEach(() => {

});



/*eslint-disable */
describe('/api #production', () => {
    describe("POST /events", async () => {
        console.log("Starting");
        const allHarFiles = await fs.readdir("./request-records-har");
        const allRequests = [];

        allHarFiles.forEach(async (fileName) => {
            const fileContent = await fs.readFile('./request-records-har', {
                encoding: 'utf-8'
            });
            const fileContentAsJSON = JSON.parse(path.join("./request-records-har", fileContent));
            fileContentAsJSON.log.entries.forEach((aRecordedRequest) => {
                allRequests.push([aRecordedRequest.request.url, aRecordedRequest.request.postData.text, aRe.response.status]);
            })
        });

        test.each(allRequests)(`When calling ${a}`, async (url, body, expectedResponse) => {
            //Arrange
            //Act
            const receivedAPIResponse = await request(expressApp)
                .post(url)
                .send(body);

            //Assert
            expect(receivedAPIResponse.body).toBe(expectedResponse)

        });
    });
});