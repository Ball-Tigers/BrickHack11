const { S3Client } = require('@aws-sdk/client-s3');

let s3 = null;

function connect() {
    s3 = new S3Client({
        region: process.env.AWS_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET
        }
    });
}

module.exports = {
    s3: () => s3,
    connect: connect
}