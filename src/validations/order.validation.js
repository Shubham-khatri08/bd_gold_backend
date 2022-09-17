const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createOrder = {
  body: Joi.object().keys({
    cart: Joi.array()
      .items(
        Joi.object().keys({
          product: Joi.required().custom(objectId),
          quantity: Joi.number().required(),
          price: Joi.number().required(),
          gstRate: Joi.number().required(),
          taxable: Joi.boolean().required(),
        })
      )
      .required(),
    user: Joi.required().custom(objectId),
    total: Joi.number().required(),
  }),
};

const getOrders = {
  query: Joi.object().keys({
    user: Joi.custom(objectId),
    sortBy: Joi.string(),
    populate: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

module.exports = {
  createOrder,
  getOrders,
};
