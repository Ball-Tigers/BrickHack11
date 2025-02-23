const express = require('express');
const group = require('../routes/group');
const device = require('../routes/device');
const router = express.Router();
const { parseOrgId } = require('../middleware/auth0');
const { upsertOrganization, updateWhitelistedIPs } = require('../services/organization');

router.post('/', parseOrgId, async (req, res) => {
    upsertOrganization(req.orgId).then(result => {
        res.status(result.code).send(result);
    });
});

router.patch('/', parseOrgId, async (req, res) => {
    const { whitelistedIPs } = req.body;
    updateWhitelistedIPs(req.orgId, whitelistedIPs).then(result => {
        res.status(result.code).send(result);
    });
});

router.use('/group', group);
router.use('/device', device);

module.exports = router;