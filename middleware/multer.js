const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const isVideo = file.mimetype.startsWith("video");
    const isPdf = file.mimetype === "application/pdf";
    const isImage = file.mimetype.startsWith("image");

    return {
      folder: isPdf
        ? "course_pdfs"
        : isVideo
        ? "course_videos"
        : "course_images",

      resource_type: isPdf
        ? "raw"
        : isVideo
        ? "video"
        : "image",

      // 🔥 THIS IS THE KEY FIX
      content_type: isPdf ? "application/pdf" : undefined,

      public_id: `${file.fieldname}-${Date.now()}`,
      use_filename: true,
      unique_filename: false,
    };
  },
});

const upload = multer({ storage });

module.exports = upload;
