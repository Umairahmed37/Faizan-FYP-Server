const mongoose = require('mongoose');


try {
  mongoose.connect(process.env.Database)
  console.log("Connected to Database");
  
} catch (error) {
  console.log(error)
}