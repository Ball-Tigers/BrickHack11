const AWS = require('aws-sdk');

let s3 = null;

function connect() {
    AWS.config.credentials = {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET
    }
    s3 = new AWS.S3();
    s3.listBuckets((err, data) => {
        if(err) {
            console.error(err);
            return;
        }
        console.log(data);
    });
}

module.exports = {
    s3: () => s3,
    connect: connect
}