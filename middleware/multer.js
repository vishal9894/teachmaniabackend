// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("cloudinary").v2;
// require("dotenv").config();

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: async (req, file) => {
//     const isVideo = file.mimetype.startsWith("video");
//     const isPdf = file.mimetype === "application/pdf";
//     const isImage = file.mimetype.startsWith("image");

//     return {
//       folder: isPdf
//         ? "course_pdfs"
//         : isVideo
//         ? "course_videos"
//         : "course_images",

//       resource_type: isPdf
//         ? "raw"
//         : isVideo
//         ? "video"
//         : "image",

//       // 🔥 THIS IS THE KEY FIX
//       content_type: isPdf ? "application/pdf" : undefined,

//       public_id: `${file.fieldname}-${Date.now()}`,
//       use_filename: true,
//       unique_filename: false,
//     };
//   },
// });

// const upload = multer({ storage });

// module.exports = upload;

const multer = require("multer");
const multerS3 = require("multer-s3");
const { S3Client } = require("@aws-sdk/client-s3");
require("dotenv").config();

// S3 configuration
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const storage = multerS3({
  s3: s3,
  bucket: process.env.AWS_BUCKET_NAME,
  acl: "public-read",
  contentType: multerS3.AUTO_CONTENT_TYPE,

  key: function (req, file, cb) {
    const isVideo = file.mimetype.startsWith("video");
    const isPdf = file.mimetype === "application/pdf";
    const isImage = file.mimetype.startsWith("image");
    let folder = "course_images";
    if (isPdf) {
      folder = "course_pdfs";
    } else if (isVideo) {
      folder = "course_videos";
    } else if (isImage) {
      folder = "course_images";
    }
    const fileName = `${folder}/${file.fieldname}-${Date.now()}-${file.originalname}`;

    cb(null, fileName);
  },
});

const upload = multer({ storage });

module.exports = upload;
