const express = require('express')
const router = express.Router()
const multer = require('multer');

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage: storage });

const storage2 = multer.diskStorage({
  destination: './uploads/Offers/',
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload2 = multer({ storage: storage2 });

const { registerPG, GetPhotographers, filteredPhotographers, GetSinglePhotographers, AddOffer, GetUserOffers, PlaceOrder, GetSingleOrder } = require('../Controllers/PGControllers')


router.route('/registerPhotographer').post(upload.single('image'), registerPG)

router.route('/AddAnOffer').post(upload2.single('image'), AddOffer)

router.route('/PlaceOrder').post(PlaceOrder)
router.route('/GetSingleOrder').post(GetSingleOrder)



router.route('/GetSinglePhotographer').post(GetSinglePhotographers)
router.route('/GetAllOffers').post(GetUserOffers)

router.route('/getPhotographers').get(GetPhotographers)
router.route('/filteredPhotographers').post(filteredPhotographers)
// router.route('/login').post(LoginUser)


module.exports = router