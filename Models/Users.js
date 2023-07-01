const { Schema } = require("mongoose");
const mongoose = require('mongoose')


const  jwt  = require("jsonwebtoken");

const userSchema = new Schema({
  Firstname: {
    type: String,
    required: true,
  },
  Lastname: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    // unique: true
  },
  Password: {
    type: String,
    required: true,
    unique: true
  },

  isPhotographer: Boolean,

  // PhotographerData: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Photographer',
  // },


  createdAt: {
    type: Date,
    default: Date.now
  }
});


userSchema.methods.getJwtToken = function () {

  return jwt.sign(
    { id: this._id },
    process.env.jwt_secret,
    { expiresIn: process.env.jwt_expire_time }
  )
  
}


module.exports = mongoose.model('User', userSchema)
