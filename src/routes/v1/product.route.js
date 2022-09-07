const express = require('express');
const multer = require('multer');

const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const productValidation = require('../../validations/product.validation');
const productController = require('../../controllers/product.controller');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router
  .route('/')
  .post(
    auth('manageProduct'),
    upload.array('images', 5),
    validate(productValidation.createProduct),
    productController.createProduct
  )
  .get(validate(productValidation.getProducts), productController.getProducts);

router
  .route('/image/:id')
  .delete(auth('manageProduct'), validate(productValidation.deleteProductImage), productController.deleteProductImage);

router
  .route('/:id')
  .get(validate(productValidation.getProduct), productController.getProduct)
  .patch(
    auth('manageProduct'),
    upload.array('images', 5),
    validate(productValidation.updateProduct),
    productController.updateProduct
  )
  .delete(auth('manageProduct'), validate(productValidation.deleteProduct), productController.deleteProduct);

module.exports = router;
