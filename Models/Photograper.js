const mongoose = require('mongoose');
const Users = require('./Users');

const photographerSchema = new mongoose.Schema({

  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  Name:{
    type:String
  },

  Age: {
    type: Number,
    // required: true
  },

  Portfolio: {
    type: String,
    // required: true
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

  Description: {
    type: String,
    // required: true
  },

  Offers: {
    type: Array,
  },

  Tagline: {
    type: String,
  },
  Experience: {
    type: String
  },
  Image: {
    type: String,
  },
  Contact:{
    type:String,
  },
  Reviews:{
    type:Number,
    default:0
  },


  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Photographer', photographerSchema)

// const Photographer = mongoose.model('Photographer', photographerSchema);
