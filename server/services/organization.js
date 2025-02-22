const { database } = require('../db/mongo');

async function upsertOrganization(orgId) {
    await database().collection('organizations').updateOne(
        {
            _id: orgId
        }, 
        {
            $set: {
                _id: orgId
            }
        }, 
        {
            upsert: true
        }
    );
    return { code: 200, message: "Upserted organization" };
}

module.exports = {
    upsertOrganization: upsertOrganization
};