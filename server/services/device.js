const { database } = require('../db/mongo');

async function createDevice(orgId, groupName, name, macAddress) {
    const group = await database().collection('groups').findOne({
        orgId: orgId,
        name: groupName
    });
    if(group === null) {
        return { code: 400, message: 'A group with that name does not exist' };
    }

    const device = await database().collection('devices').findOne({
        orgId: orgId,
        groupName: groupName,
        name: name
    });
    if(device !== null) {
        return { code: 409, message: 'A device with that name already exists' };
    }

    await database().collection('devices').insertOne({
        orgId: orgId,
        groupName: groupName,
        name: name,
        macAddress: macAddress
    });

    return { code: 200, message: 'Successfully created device' };
}

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
    createDevice: createDevice,
    getDevices: getDevices
}