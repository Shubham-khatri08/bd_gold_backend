const httpStatus = require('http-status');
const { orderService } = require('../services');
// const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');

const createOrder = catchAsync(async (req, res) => {
  const order = await orderService.createOrder(req);
  res.status(httpStatus.CREATED).send(order);
});

const getOrders = catchAsync(async (req, res) => {
  if (req.user.role === 'user') {
    req.query.user = req.user._id.toString();
  }
  const filter = pick(req.query, ['user']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await orderService.queryOrders(filter, options);
  res.send(result);
});

module.exports = {
  createOrder,
  getOrders,
};
