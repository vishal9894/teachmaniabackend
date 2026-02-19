// const Course = require("../model/courseModel");

const Course = require("../models/courseModel");
const User = require("../models/userModel")

const createCourse = async (req, res) => {
  try {
    const { title, description, price, validity } = req.body;

    const thumbnailUrl = req.files?.thumbnail?.[0]?.path;
    const videoUrl = req.files?.video?.[0]?.path;
    const resourceUrls =
      req.files?.resources?.map((f) => f.path) || [];

    // if (!thumbnailUrl || !videoUrl) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Thumbnail and video are required",
    //   });
    // }

    const course = await Course.create({
      title,
      description,
      price,
      validity,
      thumbnail: thumbnailUrl,
      video: videoUrl,
      resources: resourceUrls,
    });

    res.status(201).json({
      success: true,
      message: "Course uploaded successfully",
      data: course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();

    res.status(200).json({
      message: "Courses fetched successfully",
      courses,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch courses",
    });
  }
};

const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: "Invalid course ID" });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete course" });
  }
};

const handlePurchaseCourse = async (req, res) => {
  try {
    const userId = req.user._id;
    const { courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const user = await User.findById(userId);

    if (user.courses.includes(courseId)) {
      return res.status(400).json({ message: "Course already purchased" });
    }

    user.courses.push(courseId);
    await user.save();

    res.status(200).json({
      message: "Course purchased successfully (no payment)",
    });
  } catch (error) {
    res.status(500).json({
      message: "Purchase failed",
      error: error.message,
    });
  }
};
const getCourseContent = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);

    res.status(200).json({
      message: "Course content accessed",
      course,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to load course" });
  }
};

module.exports = { createCourse, getAllCourses, deleteCourse, getCourseById , handlePurchaseCourse ,getCourseContent };
