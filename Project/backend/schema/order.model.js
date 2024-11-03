const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  orderData: { type: Object, required: true },
  isActive: { type: Boolean, default: true },  // Active status field
  Order_status: { 
    type: String, 
    enum: ["processing", "complete", "incomplete"],
    default: "incomplete" // Default value if status is not provided
  },
  date: { type: Date, default: Date.now }  // Date field with default as current date
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
