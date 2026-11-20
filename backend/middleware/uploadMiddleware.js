
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

const uploadDir = path.join(__dirname, "../public/images");

fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const uniqueName = crypto.randomUUID();
    const extension = path.extname(file.originalname).toLowerCase();

    cb(null, uniqueName + extension);
  }
});



const fileFilter = (req, file, cb) => {
  const extension = path.extname(file.originalname).toLowerCase();

  console.log("File name:", file.originalname);
  console.log("File MIME type:", file.mimetype);

  const allowedFormats = {
    ".jpg": ["image/jpeg", "image/pjpeg"],
    ".jpeg": ["image/jpeg", "image/pjpeg"],
    ".png": ["image/png"],
    ".webp": ["image/webp"]
  };

  if (
    allowedFormats[extension] &&
    allowedFormats[extension].includes(file.mimetype)
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG, JPEG, PNG and WEBP images are allowed"));
  }
};


const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

module.exports = upload;
