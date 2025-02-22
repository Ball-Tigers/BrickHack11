const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const organization = require('./routes/organization');
const mongo = require('./db/mongo');

app.use(cors());
app.use(express.json());

const router = express.Router();
router.use('/organization', organization);
app.use('/api', router);

const server = app.listen(5000, async () => {
    await mongo.connect();
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