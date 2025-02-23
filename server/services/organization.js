const { database } = require('../db/mongo');
const { getGroups } = require('../services/group');
const { getDevices } = require('../services/device');

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

async function getOrganizations(ipAddress, macAddress) {
    const cursor = await database().collection('organizations').find({
        whitelistedIPs: ipAddress
    });
    
    let organizations = [];
    for await(const organization of cursor) {
        let groups = [];
        const orgGroups = await getGroups(organization._id);
        for(const group of orgGroups) {
            const devices = await getDevices(organization._id, group.name);
            for(const device of devices) {
                if(device.macAddress === macAddress) {
                    groups.push(group);
                }
            }
        }

        organizations.push({
            orgId: organization._id,
            groups: groups
        });
    }

    return organizations;
}

module.exports = {
    upsertOrganization: upsertOrganization,
    updateWhitelistedIPs: updateWhitelistedIPs,
    getOrganizations: getOrganizations
};