const express = require('express');
const device = require('../routes/device');
const router = express.Router();
const { createGroup, getGroups } = require('../services/group');

router.post('/', async (req, res) => {
    // TODO: Read orgId from JWT
    let orgId = "9820931209__219smmdskma";
    const { name } = req.body;
    createGroup(orgId, name).then(result => {
        res.status(result.code).send(result);
    });
});

router.get('/', async (req, res) => {
    // TODO: Read orgId from JWT
    let orgId = "9820931209__219smmdskma";
    getGroups(orgId).then(result => {
        res.status(result.code).send(JSON.stringify(result));
    })
});

router.use('/device', device);

module.exports = router;