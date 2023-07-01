
const Photographer = require('../Models/Photograper')
const jwt = require("jsonwebtoken");
const User = require('../Models/Users');
const Offer = require('../Models/Offers');
const Order = require('../Models/Orders');

exports.GetPhotographers = async (req, res) => {
  try {

    const ExistingPG = await Photographer.find().populate('User')
    return res.send(ExistingPG)

  } catch (error) {
    return res.send(error.message)
  }

}

exports.GetSinglePhotographers = async (req, res) => {
  try {

    const ExistingPG = await Photographer.findById(req.body.id).populate('User')
    return res.send(ExistingPG)

  } catch (error) {
    return res.send(error.message)
  }

}
exports.GetSingleOrder = async (req, res) => {
  try {
    console.log(req.body.id);
    // const ExistingPG = await Order.findById(req.body.id)
    const ExistingPG = await Order.findById(req.body.id)
    console.log(ExistingPG);
    return res.send(ExistingPG)

  } catch (error) {
    return res.send(error.message)
  }

}

function removeEmptyValues(object) {
  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      var value = object[key];
      if (value === null || value === undefined || value === '') {
        delete object[key];
      }
    }
  }
}

exports.filteredPhotographers = async (req, res) => {
  try {

    const { Name, Location, Events, PriceRange } = req.body;

    console.log(Name, Location, Events, PriceRange);

    let filter = {
      Name: { $regex: Name, $options: 'i' },
      Location: { $regex: Location, $options: 'i' },
      Events: { $regex: Events, $options: 'i' },
      PriceRange: { $regex: PriceRange, $options: 'i' }
    }

    removeEmptyValues(filter)
    console.log(filter);

    const ExistingPGs = await Photographer.find(filter).populate('User')
    return res.send(ExistingPGs);

  } catch (error) {
    return res.send(error.message)
  }

}


exports.registerPG = async (req, res) => {
  console.log(req.body);
  let token = req.body.token
  const decoded = jwt.verify(token, process.env.jwt_secret);

  const userreq = await User.findById(decoded.id)
  userreq.isPhotographer = true
  userreq.save()

  // const existUser = Photographer.findOne({ User: decoded.id })
  // if (existUser) {
  //   console.log("User Exist ALready");
  //   res.send({ message: "User is Already as Photographer" })
  //   return
  // } 

  let savePG = { ...req.body }
  savePG.Image = req.file.filename
  savePG.User = decoded.id
  savePG.Name = userreq.Firstname + " " + userreq.Lastname
  savePG.Contact = req.body.Contactno

  delete savePG.token

  try {
    const newPG = new Photographer(savePG)
    newPG.save()
  } catch (error) {
    return res.send(error)
  }
  return res.send('Photographer Added')
}

exports.AddOffer = async (req, res) => {
  let token = req.body.token
  const decoded = jwt.verify(token, process.env.jwt_secret);

  const userreq = await User.findById(decoded.id)

  let saveOffer = { ...req.body }
  saveOffer.Image = req.file.filename
  saveOffer.User = decoded.id

  try {
    const offeradded = new Offer(saveOffer)
    offeradded.save()
    res.statue(200).send("Offer Added")
  } catch (error) {
    res.send(error)
  }

}

exports.PlaceOrder = async (req, res) => {

  let token = req.body.token
  const decoded = jwt.verify(token, process.env.jwt_secret);
  const userreq = await User.findById(decoded.id)

  await Photographer.findByIdAndUpdate(req.body.orderPGID, { $inc: { Reviews: 1 } }, { new: true })


  let saveOrder = {}
  saveOrder.Events = req.body.Events
  saveOrder.PriceRange = req.body.PriceRange
  saveOrder.User = userreq.id

  try {
    const orderadded = new Order(saveOrder)
    orderadded.save()

    res.send(orderadded)
  } catch (error) {
    res.send(error)
  }

}


exports.GetUserOffers = async (req, res) => {


  try {
    const User = await Photographer.find({ _id: req.body.id }).populate('User')
    const Userid = User[0].User._id.toString()

    const Offers = await Offer.find({ User: Userid })
    return res.send(Offers)

  } catch (error) {
    return res.send(error.message)
  }

}

