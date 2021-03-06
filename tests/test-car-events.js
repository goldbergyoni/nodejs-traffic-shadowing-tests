const request = require('supertest');
const express = require('express');
const sinon = require('sinon');
const nock = require('nock');
const uuid = require('uuid');
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
describe('/api #traditional', () => {
    describe("POST /events", () => {
        test("When OBD-spec-2 reporting high temperature , shut off device", async () => {

            //Arrange
            const highTemperatureEvent = {
                id: uuid(),
                engine: {
                    temperature: 300
                }
            }
            //Act
            const receivedAPIResponse = await request(expressApp)
                .post("/event/audi")
                .send(highTemperatureEvent);

            //Assert
            expect(receivedAPIResponse).toMatchObject({
                status: 200,
                body: {
                    shutoff: true
                }
            });
        });
    });
});