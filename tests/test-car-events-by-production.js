const request = require('supertest');
const express = require('express');
const sinon = require('sinon');
const nock = require('nock');
const uuid = require('uuid');
const productionRequests = require('./production-requests.json');

const {
    server,
    expressApp
} = require('../index-production');

beforeAll(async (done) => {
    done();
});

afterAll(() => {
    if (server) {
        console.log("close");
        server.close();
    }
});


beforeEach(() => {

});



/*eslint-disable */
describe('/api #production', () => {
    describe("POST /events", () => {
        const allRequests = [];

        beforeAll(async (done) => {

            done();
        })

        test('should something', () => {
            console.log("foo", allRequests)
            expect(true).toBe(true);
        });

        test.each(productionRequests.productionRequests)(`When calling`, async (url, body, expectedResponse) => {
            console.log(url, body.expectedResponse)
            //Arrange

            //Act
            const receivedAPIResponse = await request(expressApp)
                .post(url)
                .send(body);

            //Assert
            expect(receivedAPIResponse.status).toBe(expectedResponse)

        });
    });
});