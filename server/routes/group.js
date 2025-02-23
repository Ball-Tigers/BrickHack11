const express = require('express');
const router = express.Router();
const { parseOrgId } = require('../middleware/auth0');
const { createGroup, getGroups } = require('../services/group');

router.post('/', parseOrgId, async (req, res) => {
    const { name } = req.body;
    createGroup(req.orgId, name).then(result => {
        res.status(result.code).send(result);
    });
});

router.get('/', parseOrgId, async (req, res) => {
    getGroups(req.orgId).then(result => {
        res.send(JSON.stringify(result));
    })
});

module.exports = router;