const express = require('express');
const group = require('../routes/group');
const router = express.Router();
const { upsertOrganization } = require('../services/organization');

router.post('/', async (req, res) => {
    const { orgId } = req.body;
    upsertOrganization(orgId).then(result => {
        res.status(result.code).send(result);
    });
});

router.get('/', (req, res) => {
    // TODO: Read orgId from JWT
    res.send('GET organization');
});

router.use('/group', group);

module.exports = router;