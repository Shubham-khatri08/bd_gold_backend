// const httpStatus = require('http-status');
const Order = require('../models/order.model');
// const ApiError = require('../utils/ApiError');
const { caculateItemsSalesTax, decreaseQuantity } = require('../utils/order');

/**
 * Create a category
 * @param {Object} categoryBody
 * @returns {Promise<Category>}
 */
const createOrder = async (req) => {
  const items = req.body.cart;
  const cart = await caculateItemsSalesTax(items);
  const { total } = req.body;
  const user = req.user._id;

  const order = new Order({
    cart,
    user,
    total,
  });

  const orderDoc = order.save();

  decreaseQuantity(cart);

  return orderDoc;
};

/**
 * Query for orders
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryOrders = async (filter, options) => {
  const orders = await Order.paginate(filter, options);
  return orders;
};

module.exports = {
  createOrder,
  queryOrders,
};
