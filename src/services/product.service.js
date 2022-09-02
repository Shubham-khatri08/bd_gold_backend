const httpStatus = require('http-status');
const { deleteFromS3Bucket } = require('../middlewares/upload');
const Product = require('../models/product.model');
const ApiError = require('../utils/ApiError');
const { s3Upload } = require('../utils/storage');

/**
 * Create a product
 * @param {Object} productBody
 * @returns {Promise<Category>}
 */
const createProduct = async (req) => {
  if (req.body.styleNo && (await Product.isStyleTaken(req.body.styleNo))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Style number already taken');
  }
  if (req.files.length === 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product image is required');
  }
  const images = [];
  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < req.files.length; index++) {
    const imageName = `prodImg-${req.body.styleNo.toLowerCase()}-${Date.now()}`;
    // eslint-disable-next-line no-await-in-loop
    const imageData = await s3Upload(req.files[index], imageName);
    images.push(imageData);
  }
  req.body.images = images;
  return Product.create(req.body);
};

/**
 * Query for products
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryProducts = async (filter, options) => {
  const products = await Product.paginate(filter, options);
  return products;
};

/**
 * Get product by id
 * @param {ObjectId} id
 * @returns {Promise<Product>}
 */
const getProductById = async (id) => {
  return Product.findById(id);
};

/**
 * Update product by id
 * @param {ObjectId} ProductId
 * @param {Object} updateBody
 * @param {Object} updateImage
 * @returns {Promise<Product>}
 */
const updateProductById = async (req) => {
  const productId = req.params.id;
  const updateBody = req.body;
  const imageFiles = req.files;
  const product = await getProductById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }
  if (updateBody.styleNo && (await Product.isStyleTaken(updateBody.styleNo, productId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Style number already taken');
  }

  if (imageFiles.length > 0) {
    const styleNo = updateBody.styleNo ? updateBody.styleNo : product.styleNo;
    const images = [];
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < req.files.length; index++) {
      const imageName = `prodImg-${styleNo.toLowerCase()}-${Date.now()}`;
      // eslint-disable-next-line no-await-in-loop
      const imageData = await s3Upload(req.files[index], imageName);
      images.push(imageData);
    }
  }

  Object.assign(product, updateBody);
  await product.save();
  return product;
};

/**
 * Delete product by id
 * @param {ObjectId} productId
 * @returns {Promise<Product>}
 */
const deleteProductById = async (productId) => {
  const product = await getProductById(productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
  }

  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < product.images.length; index++) {
    deleteFromS3Bucket(product.images[index].imageKey);
  }
  await product.remove();
  return product;
};

module.exports = {
  createProduct,
  queryProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
