'use strict';

const { HttpsClient, } = require('./HttpsClient');
const { Router,      } = require('./Router');

const app = new Router();

app.get('/v1/autocomplete', async (request, response) => {
    try {
        const body = await HttpsClient.get(`https://autocomplete.search.hereapi.com${request.path}?${Object.keys(request.query).map(key => `${key}=${request.query[key]}`).join('&')}`);

        return response.send(body);
    } catch (error) {
        console.error(error);

        return response.sendError(502);
    }
});

app.get('/v1/geocode', async (request, response) => {
    try {
        const body = await HttpsClient.get(`https://geocode.search.hereapi.com${request.path}?${Object.keys(request.query).map(key => `${key}=${request.query[key]}`).join('&')}`);

        return response.send(body);
    } catch (error) {
        console.error(error);

        return response.sendError(502);
    }
});

exports.handler = async (event, context, callback) => await app.serve(event, context, callback);
