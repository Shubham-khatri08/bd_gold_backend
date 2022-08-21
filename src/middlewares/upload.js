const multer = require('multer');
const httpStatus = require('http-status');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const ApiError = require('../utils/ApiError');
const config = require('../config/config');
const Category = require('../models/category.model');

aws.config.update({
  secretAccessKey: config.aws.secretAccessKey,
  accessKeyId: config.aws.accessKeyID,
  region: config.aws.region,
});

const s3 = new aws.S3();

const categoryImageMulterFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new ApiError(httpStatus.UNSUPPORTED_MEDIA_TYPE, 'Please upload an image format'));
  }
};

const categoryImageMulterS3Storage = multer({
  fileFilter: categoryImageMulterFilter,
  storage: multerS3({
    s3,
    bucket: config.aws.bucketName,
    acl: 'public-read',
    async key(req, file, cb) {
      if (req.method === 'POST' && req.body.name === undefined) {
        cb(new ApiError(httpStatus.BAD_REQUEST, 'Name is required'));
      }
      if (req.method === 'POST' && (await Category.isNameTaken(req.body.name))) {
        cb(new ApiError(httpStatus.BAD_REQUEST, 'Name already taken'));
      }
      const ext = file.mimetype.split('/')[1];
      cb(null, `catImg-${req.body.name.toLowerCase()}-${Date.now()}.${ext}`);
    },
  }),
});

const categoryImageUpload = categoryImageMulterS3Storage.single('image');

// Delete object from S3 bucket
const deleteFromS3Bucket = async (data) => {
  const deleteData = { Bucket: config.aws.bucketName, Key: data };

  await s3
    .deleteObject(deleteData, function (err) {
      if (err) {
        throw new ApiError(httpStatus.NOT_FOUND, 'File not found');
      }
    })
    .promise();
};

module.exports = {
  categoryImageUpload,
  deleteFromS3Bucket,
};
