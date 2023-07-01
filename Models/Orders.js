const { Schema } = require("mongoose");
const mongoose = require('mongoose')

const OrderSchema = new Schema({


  Events: {
    type: String,
  },
  PriceRange: {
    type: String,
  },

  // DateofOrder: {
  //   type: String,
  // },
  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },


  createdAt: {
    type: Date,
    default: Date.now
  }
});





module.exports = mongoose.model('Order', OrderSchema)
