const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = "upload/images";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const upload = multer({
  limits: { fileSize: 800000 }, 
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir); 
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `${Date.now()}${ext}`); 
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedFileTypes = ["jpg", "jpeg", "png"];
    const fileExt = file.mimetype.split("/")[1];
    if (allowedFileTypes.includes(fileExt)) {
      cb(null, true); 
    } else {
      cb(new Error("Invalid file type. Only JPG, JPEG, and PNG are allowed."), false);
    }
  },
});

module.exports = upload;