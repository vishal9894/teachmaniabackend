const express = require("express");
const {
  createCourse,
  getAllCourses,
  getCourseById,
  deleteCourse,
  handlePurchaseCourse,
  getCourseContent,
} = require("../controller/courseController");

const authMiddleware = require("../middleware/authmiddleware");
const upload = require("../middleware/multer");
const verifyRole = require("../middleware/veryfiyRole");

const router = express.Router();

router.post(
  "/add-course",
  authMiddleware,
  verifyRole("admin"),
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 },
    { name: "resources", maxCount: 10 },
  ]),createCourse,);
router.get("/get-course", authMiddleware, getAllCourses);
router.get("/get-course/:id", authMiddleware, getCourseById);
router.delete("/course-delete/:id", authMiddleware, deleteCourse);
router.post("/purchase", authMiddleware, handlePurchaseCourse);

router.get(
  "/content/:courseId",
  authMiddleware,
  getCourseContent,
);

module.exports = router;
