const { database } = require('../db/mongo');

async function getDevices(orgId, groupName) {
    const group = await database().collection('groups').findOne({
        orgId: orgId,
        name: groupName
    });
    if(group === null) {
        return { code: 400, message: 'A group with that name does not exist' };
    }

    const cursor = await database().collection('devices').find({
        orgId: orgId,
        groupName: groupName
    });

    let devices = []
    for await(const device of cursor) {
        devices.push(device);
    }
    return devices;
}

module.exports = {
    getDevices: getDevices
}