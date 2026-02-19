const { model } = require("mongoose");

const verifyRole = (role) => {
  return (req, res, next) => {

    console.log("User from token:", req.user);
    console.log("Expected role:", role);
    console.log("Actual role:", req.user?.role);

    if (!req.user || req.user.role !== role) {
      return res.status(403).json({
        message: "Forbidden: Admin access only"
      });
    }

    next();
  };
};


module.exports = verifyRole;