const Product = require('../models/product.model');

/* eslint-disable no-param-reassign */
exports.caculateItemsSalesTax = (items) => {
  const products = items.map((item) => {
    // const taxRate = item.gstRate;
    item.priceWithTax = 0;
    item.totalPrice = 0;
    item.totalTax = 0;
    item.purchasePrice = item.price;

    const price = item.purchasePrice;
    const { quantity } = item;
    item.totalPrice = parseFloat(Number((price * quantity).toFixed(2)));

    // if (item.taxable) {
    //   const taxAmount = price * (taxRate / 100) * 100;

    //   item.totalTax = parseFloat(Number((taxAmount * quantity).toFixed(2)));
    //   item.priceWithTax = parseFloat(Number((item.totalPrice + item.totalTax).toFixed(2)));
    // }

    return item;
  });

  return products;
};

exports.decreaseQuantity = (products) => {
  const bulkOptions = products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.product },
        update: { $inc: { quantity: -item.quantity } },
      },
    };
  });

  Product.bulkWrite(bulkOptions);
};

exports.increaseQuantity = (products) => {
  const bulkOptions = products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.product },
        update: { $inc: { quantity: item.quantity } },
      },
    };
  });

  Product.bulkWrite(bulkOptions);
};
