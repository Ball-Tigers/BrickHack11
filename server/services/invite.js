const { database } = require('../db/mongo');
const crypto = require('crypto');

async function createInvite(orgId, groupName) {
    const group = await database().collection('groups').findOne({
        orgId: orgId,
        name: groupName
    });
    if(group === null) {
        return { code: 400, message: 'A group with that name does not exist' };
    }

    const inviteCode = crypto.randomBytes(32).toString('base64url');
    const expiresAt = new Date(new Date().getTime() + (1000 * 60 * 60));
    await database().collection('invites').insertOne({
        orgId: orgId,
        groupName: groupName,
        inviteCode: inviteCode,
        expiresAt: expiresAt
    });

    return { code: 200, message: 'Successfully created invite', inviteCode: inviteCode, expiresAt: expiresAt };
}

async function acceptInvite(inviteCode, name, macAddress) {
    const invite = await database().collection('invites').findOne({
        inviteCode: inviteCode
    });
    if(invite === null) {
        return { code: 400, message: 'Invalid invite code specified' };
    } else if(Date.parse(invite.expiresAt) < new Date().getTime()) {
        return { code: 410, message: 'Invite code expired' };
    }
    
    const device = await database().collection('devices').findOne({
        orgId: invite.orgId,
        groupName: invite.groupId,
        name: name
    });
    if(device !== null) {
        return { code: 409, message: 'A device with that name already exists' };
    }

    await database().collection('devices').insertOne({
        orgId: invite.orgId,
        groupName: invite.groupName,
        name: name,
        macAddress: macAddress
    });

    return { code: 200, message: 'Successfully created device' };
}

async function getInvite(inviteCode) {
    const invite = await database().collection('invites').findOne({
        inviteCode: inviteCode
    });

    if(invite === null) {
        return { code: 404, message: 'Invalid invite code specified' };
    }

    return { code: 200, groupName: invite.groupName };
}

module.exports = {
    createInvite: createInvite,
    acceptInvite: acceptInvite,
    getInvite: getInvite
}