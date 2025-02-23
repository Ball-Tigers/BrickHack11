const express = require('express');
const router = express.Router();
const { uploadFile, downloadFile, getFile } = require('../services/file');

router.post('/upload', (req, res) => {
    const { orgId, groupName } = req.body;
    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const macAddress = req.headers.mac;
    const fileName = req.files.file.name;
    const fileContent  = Buffer.from(req.files.file.data, 'binary');
    uploadFile(orgId, groupName, ipAddress, macAddress, fileName, fileContent).then(result => {
        res.status(result.code).send(result);
    });
});

router.get('/download', (req, res) => {
    const fileKey = req.query.fileKey;
    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const macAddress = req.headers.mac;
    downloadFile(fileKey, ipAddress, macAddress).then(result => {
        if(result.Body) {
            result.Body.pipe(res);
            return;
        }
        res.status(result.code).send(result);
    });
});

router.get('/', (req, res) => {
    const fileKey = req.query.fileKey;
    getFile(fileKey).then(result => {
        console.log(result);
        res.status(result.code).send(JSON.stringify(result));
    });
}); 

module.exports = router;