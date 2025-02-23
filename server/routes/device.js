const express = require('express');
const router = express.Router();
const { parseOrgId } = require('../middleware/auth0');
const { getDevices } = require('../services/device');

router.get('/', parseOrgId, (req, res) => {
    const groupName = req.query.groupName;
    getDevices(req.orgId, groupName).then(result => {
        res.send(result);
    });
});

module.exports = router;