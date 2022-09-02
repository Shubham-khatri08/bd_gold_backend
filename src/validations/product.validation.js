const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createProduct = {
  body: Joi.object().keys({
    styleNo: Joi.string().required(),
    name: Joi.string().required(),
    category: Joi.string().custom(objectId),
    metal: Joi.string().custom(objectId),
    purity: Joi.string().required(),
    grossWeight: Joi.number(),
    netWeight: Joi.number(),
    length: Joi.number(),
    noOfDiamonds: Joi.number(),
    quantity: Joi.number(),
    description: Joi.string(),
    price: Joi.number(),
    labourPerGram: Joi.boolean(),
    labourCharges: Joi.number(),
    otherCharges: Joi.number(),
    taxable: Joi.boolean(),
    gstRate: Joi.number(),
    isActive: Joi.boolean(),
  }),
};

const getProducts = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    populate: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getProduct = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updateProduct = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      styleNo: Joi.string(),
      name: Joi.string(),
      category: Joi.string().custom(objectId),
      metal: Joi.string().custom(objectId),
      purity: Joi.string(),
      grossWeight: Joi.number(),
      netWeight: Joi.number(),
      length: Joi.number(),
      noOfDiamonds: Joi.number(),
      quantity: Joi.number(),
      description: Joi.string(),
      price: Joi.number(),
      labourPerGram: Joi.boolean(),
      labourCharges: Joi.number(),
      otherCharges: Joi.number(),
      taxable: Joi.boolean(),
      gstRate: Joi.number(),
      isActive: Joi.boolean(),
    })
    .min(1),
};

const deleteProduct = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
