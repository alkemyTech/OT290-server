const AWS = require("aws-sdk");
const fs = require("fs");
require("dotenv").config();
const AmazonS3URI = require('amazon-s3-uri');

AWS.config.update({
  accessKeyId: process.env.AWS_PUBLIC_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});

const Bucket = process.env.BUCKET_NAME;
const S3 = require("aws-sdk/clients/s3");

const s3 = new S3({
  apiVersion: "2006-03-01",
});

// const uploadFileS3 = (fileName) => {
const uploadFileS3 = (imageBuffer, imageName) => {
  return new Promise((resolve, reject) => {
    // Setting up S3 upload parameters
    // const fileContent = fs.readFileSync(fileName);
    const uploadParams = {
      Bucket: Bucket,
      Key: imageName,
      Body: imageBuffer,
    };

    // Uploading files to the bucket
    s3.upload(uploadParams, function (err, data) {
      if (err) {
        // throw err;
        reject(err);
      }
      resolve(data.Location);
    });
  });
};

const deleteFileS3 = (imageUrl) => {
  var { bucket , key } = AmazonS3URI(imageUrl)
  var deleteParams = {
    Bucket: bucket,
    Key: key,
  };

  s3.deleteObject(deleteParams, (err, data) => {
    if (err) {
      reject(err);
    }
  });
};

module.exports = { uploadFileS3, deleteFileS3};
