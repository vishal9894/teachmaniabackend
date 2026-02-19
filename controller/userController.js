const User = require("../models/userModel");
// const  generateToken  = require("../services/auth");
const bcrypt = require("bcrypt");
const { GenerateToken } = require("../services/auth");

const HandleSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "require all fild" });
    }
    const isMatch = await User.findOne({ email });
    if (isMatch) {
      res.status(400).json({ message: "user Already exist" });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const user = User({ name, email, password: hashpassword });
    const token = GenerateToken(user);

    await user.save();

    res.status(201).json({
      message: "user register sucessfully",
      user: {
        id: user._id,
        email: user.email,
        role : user.role
      },
      token,
    });
  } catch (error) {
    console.log(error);
  }
};

const HandleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ message: "user not Found" });
    }
    const token = GenerateToken(user);
    res.status(200).json({
      message: "user login sucessfully",
      user: {
        id: user._id,
        email: user.email,
        role : user.role
      },
      token,
    });
  } catch (error) {
    console.log(error);
  }
};

const HandleUpdateProtfolio = async (req , res) =>{
    try {
        res.send("cooming soon");
    } catch (error) {
        
    }
}

const HanldeAllUser = async (req, res) => {
  try {
    const user = await User.find().select("-password");
    const count = user.length;
    res.status(200).json({message  :" get all user" , user , count})
  } catch (error) {}
};

const HandleGetUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    console.log(user);

    res.status(200).json({ message: "fetch user Sucessfylly", user });
  } catch (error) {}
};
const HandleLogout = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
}
module.exports = { HandleLogin, HandleSignup, HandleGetUser ,HanldeAllUser ,HandleUpdateProtfolio ,HandleLogout };
