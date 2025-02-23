const { database } = require('../db/mongo');

async function upsertOrganization(orgId) {
    await database().collection('organizations').updateOne(
        {
            _id: orgId
        }, 
        {
            $setOnInsert: {
                _id: orgId,
                whitelistedIPs: ['::1']
            }
        }, 
        {
            upsert: true
        }
    );

    const organization = await database().collection('organizations').findOne({
        _id: orgId
    });

    return { code: 200, message: 'Upserted organization', orgId: orgId, whitelistedIPs: organization.whitelistedIPs };
}

async function updateWhitelistedIPs(orgId, whitelistedIPs) {
    await database().collection('organizations').updateOne(
        {
            _id: orgId
        },
        {
            $set: {
                whitelistedIPs: whitelistedIPs
            }
        }
    );
    return { code: 200, message: 'Updated whitelisted IPs' };
}

module.exports = {
    upsertOrganization: upsertOrganization,
    updateWhitelistedIPs: updateWhitelistedIPs
};