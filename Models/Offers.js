const { Schema } = require("mongoose");
const mongoose = require('mongoose')
 
const OfferSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Events:{
    type:String,
  },
  PriceRange:{
    type:String,
  },

  Location: {
    type: String,
    // required: true
  },
  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  Image: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});


 


module.exports = mongoose.model('Offer', OfferSchema)
