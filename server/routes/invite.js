const express = require('express');
const router = express.Router();
const { parseOrgId } = require('../middleware/auth0');
const { createInvite, acceptInvite } = require('../services/invite');

router.post('/', parseOrgId, (req, res) => {
    const { groupName } = req.body;
    createInvite(req.orgId, groupName).then(result => {
        res.status(result.code).send(result);
    });
});

router.post('/accept', (req, res) => {
    const { inviteCode, name, macAddress } = req.body;
    acceptInvite(inviteCode, name, macAddress).then(result => {
        res.status(result.code).send(result);
    });
})

module.exports = router;