const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const metalSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
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
metalSchema.plugin(toJSON);
metalSchema.plugin(paginate);

/**
 * @typedef Metal
 */
const Metal = mongoose.model('Metal', metalSchema);

module.exports = Metal;
