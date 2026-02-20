const express = require("express");
const {
  HandleSignup,
  HandleLogin,
  HandleGetUser,
  HanldeAllUser,
  HandleUpdateProtfolio,
  HandleLogout,
} = require("../controller/userController");
const authMiddleware = require("../middleware/authmiddleware");
const verifyRole = require("../middleware/veryfiyRole");

const route = express.Router();

route.post("/signup", HandleSignup);
route.post("/login", HandleLogin);
route.post("/logout", HandleLogout);
route.get("/profile",  authMiddleware, HandleGetUser);
route.get("/alluser", verifyRole("admin"), authMiddleware, HanldeAllUser);
route.put("/update-porfile/:id", authMiddleware, HandleUpdateProtfolio);

module.exports = route;
