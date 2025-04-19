const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: 'denny',
  },
  img: {
    type: String,
    required: true,
    default: 'placeholder',
  }
})

module.exports = mongoose.model("Item", itemSchema);