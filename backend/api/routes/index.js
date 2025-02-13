const express = require('express');

const users = require('./users.router');
const patients = require('./patients.router');
const requests = require('./requests.router');
const documents = require('./documents.router');
const candidates = require('./candidates.router');
const missions = require('./missions.router');
const auth = require('./auth.router');

function routerApi(app) {
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/users', users);
    router.use('/patients', patients);
    router.use('/requests', requests);
    router.use('/documents', documents);
    router.use('/candidates', candidates);
    router.use('/missions', missions);
    router.use('/auth', auth);
}

module.exports = routerApi;