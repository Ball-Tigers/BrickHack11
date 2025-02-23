const { s3 } = require('../aws/s3');
const crypto = require('crypto');
const { PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { database } = require('../db/mongo');
const { getDevices } = require('../services/device');

async function uploadFile(orgId, groupName, ipAddress, macAddress, fileName, fileContent) {    
    const group = await database().collection('groups').findOne({
        orgId: orgId,
        name: groupName
    });
    if(group === null) {
        return { code: 400, message: 'A group with that name does not exist' };
    }

    const valid = await validate(orgId, groupName, ipAddress, macAddress);
    if(!valid) {
        return { code: 403, message: 'Forbidden from downloading this file' };
    }

    const awsKey = crypto.randomBytes(32).toString('base64url');
    const command = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: awsKey,
        Body: fileContent
    });
    
    try {
        await s3().send(command);
    } catch(err) {
        console.error(err);
        return { code: 500, message: 'Error uploading file to S3' };
    }

    const fileKey = crypto.randomBytes(32).toString('base64url');
    await database().collection('files').insertOne({
        _id: fileKey,
        orgId: orgId,
        groupName: groupName,
        fileName: fileName,
        awsKey: awsKey
    });
    return { code: 200, message: 'Successfully uploaded file', fileKey: fileKey };
}

async function downloadFile(fileKey, ipAddress, macAddress) {
    const file = await database().collection('files').findOne({
        _id: fileKey
    });
    if(file === null) {
        return { code: 404, message: 'File not found' };
    }

    const valid = await validate(file.orgId, file.groupName, ipAddress, macAddress);
    if(!valid) {
        return { code: 403, message: 'Forbidden from downloading this file' };
    }

    const command = new GetObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: file.awsKey
    });
    const awsResult = await s3().send(command);
    return awsResult;
}

async function getFile(fileKey) {
    const file = await database().collection('files').findOne({
        _id: fileKey
    });
    if(file === null) {
        return { code: 404, message: 'File not found' };
    }
    return { code: 200, fileName: file.fileName };
}

async function validate(orgId, groupName, ipAddress, macAddress) {
    const organization = await database().collection('organizations').findOne({
        _id: orgId
    });

    if(!organization.whitelistedIPs.includes(ipAddress)) {
        return false;
    } else if(groupName) {
        const devices = await getDevices(orgId, groupName);
        let validMac = false;
        for(const device of devices) {
            if(device.macAddress === macAddress) {
                validMac = true;
                break;
            }
        }

        if(!validMac) return false;
    }

    return true;
}

module.exports = {
    uploadFile: uploadFile,
    downloadFile: downloadFile,
    getFile: getFile
}