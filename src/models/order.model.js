const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

// Cart Item Schema
const CartItemSchema = mongoose.Schema({
  product: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Product',
  },
  quantity: Number,
  purchasePrice: {
    type: Number,
    default: 0,
  },
  totalPrice: {
    type: Number,
    default: 0,
  },
  taxRate: Number,
  priceWithTax: {
    type: Number,
    default: 0,
  },
  totalTax: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('CartItem', CartItemSchema);

const orderSchema = mongoose.Schema(
  {
    cart: [CartItemSchema],
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },
    total: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      default: 'Not processed',
      enum: ['Not processed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
orderSchema.plugin(toJSON);
orderSchema.plugin(paginate);

/**
 * @typedef Order
 */
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
