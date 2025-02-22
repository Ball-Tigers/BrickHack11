const { MongoClient, ServerApiVersion } = require('mongodb');

const client = new MongoClient(process.env.MONGO_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
});

let database = null;

async function connect() {
    await client.connect();
    database = client.db(process.env.MONGO_DB);
    console.log('Connected to MongoDB server');
}

async function shutdown() {
    await client.close();
}

module.exports = {
    database: () => database,
    connect: connect,
    shutdown: shutdown
};