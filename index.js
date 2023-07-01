const dotenv = require('dotenv')
const express = require('express')
 
dotenv.config();
const multer = require('multer');

const app = require('./app')

const connectdb = require('./Config/Database')

 
process.on('uncaughtException', err => {
  console.log(`ERROR ${err}`)
  console.log("SHUTTING DOWN DATABASE");
  // process.exit(1)
})

// cloudinary.config({
//   cloud_name:process.env.Cloud_name,
//   api_key:process.env.Cloud_key,  
//   api_secret: process.env.Cloud_secret
// })

app.use('/uploads', express.static('uploads'));

app.listen(process.env.PORT, () =>
  console.log(`Server Started on port ${process.env.PORT} in ${process.env.NODE_ENV} mode. `)
)  