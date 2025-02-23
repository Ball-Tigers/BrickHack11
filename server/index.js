const express = require('express');
const app = express();
const cors = require('cors');
const fileUpload = require('express-fileupload');
require('dotenv').config();
const organization = require('./routes/organization');
const file = require('./routes/file');
const mongo = require('./db/mongo');
const aws = require('./aws/s3');

app.use(cors());
app.use(express.json());
app.use(fileUpload());

const router = express.Router();
router.use('/organization', organization);
router.use('/file', file);
app.use('/api', router);

const server = app.listen(5000, async () => {
    await mongo.connect();
    aws.connect();
    console.log(`Listening on 5000...`);
});

async function shutdown() {
    server.close(() => {
        console.log("HTTP server terminated");
    });
    mongo.shutdown().then(() => {
        console.log("MongoDB connection terminated");
    });
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);