const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const productSchema = mongoose.Schema(
  {
    styleNo: {
      type: String,
      trim: true,
      unique: true,
    },
    name: {
      type: String,
      trim: true,
    },
    images: [
      {
        imageUrl: {
          type: String,
          trim: true,
        },
        imageKey: {
          type: String,
          trim: true,
        },
      },
    ],
    category: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Category',
    },
    metal: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Metal',
    },
    purity: {
      type: String,
      trim: true,
    },
    grossWeight: Number,
    netWeight: Number,
    length: Number,
    noOfDiamonds: Number,
    description: {
      type: String,
      trim: true,
    },
    quantity: {
      type: Number,
    },
    price: {
      type: Number,
    },
    labourPerGram: {
      type: Boolean,
      default: false,
    },
    labourCharges: Number,
    otherCharges: Number,
    taxable: {
      type: Boolean,
      default: false,
    },
    gstRate: {
      type: Number,
      default: 3,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
productSchema.plugin(toJSON);
productSchema.plugin(paginate);

/**
 * Check if styleNo is taken
 * @param {string} styleNo - The product styleNo
 * @param {ObjectId} [excludeProductId] - The id of the product to be excluded
 * @returns {Promise<boolean>}
 */
productSchema.statics.isStyleTaken = async function (styleNo, excludeProductId) {
  const product = await this.findOne({ styleNo, _id: { $ne: excludeProductId } });
  return !!product;
};

/**
 * @typedef Product
 */
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
