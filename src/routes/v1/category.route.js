const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const categoryValidation = require('../../validations/category.validation');
const categoryController = require('../../controllers/category.controller');
const { categoryImageUpload } = require('../../middlewares/upload');

const router = express.Router();

router
  .route('/')
  .post(auth('manageCategory'), categoryImageUpload, categoryController.createCategory)
  .get(auth('getCategories'), validate(categoryValidation.getCategories), categoryController.getCategories);

router
  .route('/:id')
  .get(auth('getCategories'), validate(categoryValidation.getCategory), categoryController.getCategory)
  .patch(auth('manageCategory'), categoryImageUpload, categoryController.updateCategory)
  .delete(auth('manageCategory'), validate(categoryValidation.deleteCategory), categoryController.deleteCategory);

module.exports = router;
