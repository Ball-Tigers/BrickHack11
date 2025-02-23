const express = require('express');
const router = express.Router();
const { parseOrgId } = require('../middleware/auth0');
const { createDevice, getDevices } = require('../services/device');

router.post('/', parseOrgId, (req, res) => {
    const { groupName, name, macAddress } = req.body;
    createDevice(req.orgId, groupName, name, macAddress).then(result => {
        res.status(result.code).send(result);
    });
});

router.get('/', parseOrgId, (req, res) => {
    const groupName = req.query.groupName;
    getDevices(req.orgId, groupName).then(result => {
        res.send(result);
    });
});

module.exports = router;