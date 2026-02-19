const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },

    thumbnail: { type: String }, // Cloudinary URL
    video: { type: String },     // Cloudinary URL

    price: { type: Number, required: true, default: 3000 },
    validity: { type: String, required: true },

    resources: {
      type: [String], // PDF URLs
      default: [],
    },
  },
  { timestamps: true }
);
const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
