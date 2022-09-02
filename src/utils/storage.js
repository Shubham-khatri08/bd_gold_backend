const AWS = require('aws-sdk');
const httpStatus = require('http-status');

const config = require('../config/config');
const ApiError = require('./ApiError');

exports.s3Upload = async (image, imageName) => {
  let imageUrl = '';
  let imageKey = '';

  if (image) {
    const s3bucket = new AWS.S3({
      accessKeyId: config.aws.accessKeyID,
      secretAccessKey: config.aws.secretAccessKey,
      region: config.aws.region,
    });

    const params = {
      Bucket: config.aws.bucketName,
      Key: imageName,
      Body: image.buffer,
      ContentType: image.mimetype,
      ACL: 'public-read',
    };

    const s3Upload = await s3bucket.upload(params).promise();

    imageUrl = s3Upload.Location;
    imageKey = s3Upload.key;
  }

  return { imageUrl, imageKey };
};

// Delete object from S3 bucket
exports.deleteFromS3Bucket = async (data) => {
  const s3bucket = new AWS.S3({
    accessKeyId: config.aws.accessKeyID,
    secretAccessKey: config.aws.secretAccessKey,
    region: config.aws.region,
  });
  const deleteData = { Bucket: config.aws.bucketName, Key: data };

  await s3bucket
    .deleteObject(deleteData, function (err) {
      if (err) {
        throw new ApiError(httpStatus.NOT_FOUND, 'File not found');
      }
    })
    .promise();
};
