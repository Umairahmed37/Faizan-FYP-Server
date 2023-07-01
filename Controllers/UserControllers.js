
const User = require('../Models/Users')
const sendToken = require('../Utils/sentToken')


exports.registerUser = async (req, res) => {

  const { Firstname, Lastname, Email, Password } = req.body

  if (!Firstname || !Lastname || !Email || !Password) {
    return res.send({ error: "Please Enter All Fields" })
  }

  const userexist = await User.findOne({ Email })

  if (userexist) {
    return res.send({ error: "User Already Exists" })
  }


  try {

    const newuser = new User({ Firstname, Lastname, Email, Password })
    newuser.save()
    sendToken(newuser, 200, res)


  } catch (error) {
    return res.send(error.message)
  }

  // return res.send('User Added')
}
 
exports.GoogleregisterUser = async (req, res) => {

  const { Firstname, Lastname, Email, Password } = req.body

  // if (!Firstname || !Lastname || !Email || !Password) {
  //   return res.send({ error: "Please Enter All Fields" })
  // }
  // console.log(Firstname, Lastname, Email);

  const userexist = await User.findOne({ Email })

  if (userexist) {
    return res.send({ error: "User Already Exists" })
  }


  try {

    const newuser = new User({ Firstname, Lastname, Email, Password })
    newuser.save()
    sendToken(newuser, 200, res)


  } catch (error) {
    return res.send(error.message)
  }

  // return res.send('User Added')
}

exports.LoginUser = async (req, res) => {

  const { Email, Password } = req.body

  try {
    const ExistingUser = await User.findOne({ Email })

    if (!ExistingUser) {
      return res.send({ error: "User does not Exists" })
    }

    const ExistingPassword = await ExistingUser.Password
    if (ExistingPassword !== Password) {
      return res.send({ error: "Passwords does not match" })

    }


    sendToken(ExistingUser, 200, res)
    return

  } catch (error) {
    return res.send(error.message)
  }
  return res.send('Logged In Successfully')
}

exports.GoogleLoginUser = async (req, res) => {

  const { Email } = req.body
  console.log(Email);

  try {
    const ExistingUser = await User.findOne({ Email })
    console.log(ExistingUser);

    if (!ExistingUser) {
      return res.send({ error: "User does not Exists" })
    }

    // const ExistingPassword = await ExistingUser.Password
    // if (ExistingPassword !== Password) {
    //   return res.send({ error: "Passwords does not match" })

    // }


    sendToken(ExistingUser, 200, res)
    return

  } catch (error) {
    return res.send(error.message)
  }
  return res.send('Logged In Successfully')
}


exports.GetUsers = async (req, res) => {
  try {

    const ExistingUser = await User.find()
    return res.send(ExistingUser)

  } catch (error) {
    return res.send(error.message)
  }

}