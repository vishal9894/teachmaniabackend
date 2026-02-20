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
    res.cookie("token", token, {
      httpOnly: true, // prevents XSS attack
      secure: false, // true in production (HTTPS)
      sameSite: "Strict", // CSRF protection
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    await user.save();

    res.status(201).json({
      message: "user register sucessfully",
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
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
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "user login sucessfully",
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
  }
};

const HandleUpdateProtfolio = async (req, res) => {
  try {
    res.send("cooming soon");
  } catch (error) {}
};

const HanldeAllUser = async (req, res) => {
  try {
    const { page = 1, limit = 2 } = req.query;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    const skip = (pageNum - 1) * limitNum;

    // get users with pagination
    const users = await User.find({})
      .select("-password")
      .skip(skip)
      .limit(limitNum);

    // get total user count
    const totalUsers = await User.countDocuments();

    res.status(200).json({
      message: "Get all users",
      users,
      totalUsers,
      currentPage: pageNum,
      totalPages: Math.ceil(totalUsers / limitNum),
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const HandleGetUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

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
};
module.exports = {
  HandleLogin,
  HandleSignup,
  HandleGetUser,
  HanldeAllUser,
  HandleUpdateProtfolio,
  HandleLogout,
};
