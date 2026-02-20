const multer = require("multer");
const multerS3 = require("multer-s3");
const { S3Client } = require("@aws-sdk/client-s3");
require("dotenv").config();

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const storage = multerS3({
  s3,
  bucket: process.env.AWS_BUCKET_NAME || "",
  acl: "public-read",
  contentType: multerS3.AUTO_CONTENT_TYPE,

  key: (req, file, cb) => {
    let folder = "course_images";

    if (file.mimetype === "application/pdf") {
      folder = "course_pdfs";
    } else if (file.mimetype.startsWith("video")) {
      folder = "course_videos";
    }

    const filename = `${folder}/${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

module.exports = upload;
