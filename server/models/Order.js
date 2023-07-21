const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  products: [
    {
      name: String,
      Image: String,
      price: Number,
      quantity: Number,
    }
  ]
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
