const { database } = require('../db/mongo');

async function createGroup(orgId, name) {
    const group = await database().collection('groups').findOne({
        orgId: orgId,
        name: name
    });
    if(group !== null) {
        return { code: 409, message: 'Group already exists with that name' };
    }

    await database().collection('groups').insertOne({
        orgId: orgId,
        name: name
    });

    return { code: 200, message: 'Successfully created group' };
}

async function getGroups(orgId) {
    const cursor = await database().collection('groups').find({
        orgId: orgId
    }).project({
        _id: 0,
        orgId: 0
    });

    let groups = [];
    for await(let group of cursor) {
        groups.push(group);
    }

    return groups;
}

module.exports = {
    createGroup: createGroup,
    getGroups: getGroups
}