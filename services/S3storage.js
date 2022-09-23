const AWS = require('aws-sdk');
const fs = require('fs');
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

const uploadFileS3 = (fileName) => {
    // Setting up S3 upload parameters
    const fileContent = fs.readFileSync(fileName);
    const uploadParams = {
        Bucket: Bucket,
        Key: fileName,
        Body: fileContent,
    };

    // Uploading files to the bucket
    s3.upload(uploadParams, function(err, data) {
        if (err) {
            throw err;
        }
        return data.Location;
    });
};

module.exports = {
  uploadFileS3
  };