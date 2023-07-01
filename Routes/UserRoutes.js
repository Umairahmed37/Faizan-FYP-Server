const express = require('express')
const router = express.Router()


const { registerUser, LoginUser, GetUsers, GoogleLoginUser, GoogleregisterUser } = require('../Controllers/UserControllers')



router.route('/GetUsers').get(GetUsers)
// router.route('/getcookie').post(GetCookie)


router.route('/register').post(registerUser)
router.route('/Googleregister').post(GoogleregisterUser)
router.route('/login').post(LoginUser)
router.route('/Googlelogin').post(GoogleLoginUser)





module.exports = router