const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
  AWS_ACCESS_KEY_ID: process.env.AWS_PUBLIC_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_KEY,
  AWS_REGION: process.env.AWS_REGION,
});

const Bucket = process.env.BUCKET_NAME
const S3 = require('aws-sdk/clients/s3');

const s3 = new S3({
  apiVersion: '2006-03-01'
});

const uploadFileS3 = (params) => {
    // Setting up S3 upload parameters
    const uploadParams = {
        Bucket: Bucket,
        Key: params.key,
        Body: params.buffer,
    };

    // Uploading files to the bucket
    s3.upload(uploadParams, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    });
};

module.exports = {
    uploadToBucket
  };