const { database } = require('../db/mongo');

async function createDevice(orgId, groupName, name, macAddress) {
    
}

async function getDevices(orgId, groupName) {
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