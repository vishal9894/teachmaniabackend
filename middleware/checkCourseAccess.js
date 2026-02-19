const User = require("../models/userModel");

const checkCourseAccess = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    const courseId = req.params.courseId;

    if (!user.courses.includes(courseId)) {
      return res.status(403).json({
        message: "Access denied. Purchase the course first.",
      });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Access check failed" });
  }
};

module.exports = checkCourseAccess;
