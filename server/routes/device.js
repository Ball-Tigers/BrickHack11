const express = require('express');
const router = express.Router();
const { createDevice, getDevices } = require('../services/device');

router.post('/', (req, res) => {
    let orgId = "9820931209__219smmdskma";
    const { groupName, name, macAddress } = req.body;
    createDevice(orgId, groupName, name, macAddress).then(result => {
        res.status(result.code).send(result);
    });
});

router.get('/', (req, res) => {
    let orgId = "9820931209__219smmdskma";
    const groupName = req.params.groupName;
    getDevices(orgId, groupName).then(result => {
        res.send(result);
    });
});

module.exports = router;