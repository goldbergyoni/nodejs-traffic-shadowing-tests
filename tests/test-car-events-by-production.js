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

        test.each(productionRequests.all)(`When calling %s, expect response status to be %s`, async (url, expectedResponse, body) => {
            // Arrange

            // Act
            const receivedAPIResponse = await request(expressApp)
                .post(url)
                .send(body);

            // Assert
            expect(receivedAPIResponse.status).toBe(expectedResponse)
        });
    });
});