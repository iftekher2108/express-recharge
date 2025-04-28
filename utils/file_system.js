const multer = require("multer");
const path = require("path");
const fs = require("fs");

function upload_file(dir_path = "/") {
  const storage = multer.diskStorage({
    destination:async function (req, file, cb) {
      const dir = path.basename("public") + dir_path;
      if (!fs.existsSync(dir)) {
      await fs.mkdirSync(dir, { recursive: true });
      }
      cb(null, dir);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + "-" + file.originalname);
    },
  });

  // File type validation
  const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpg|jpeg|png|gif|pdf/; // allowed extensions
    const mimeType = allowedTypes.test(file.mimetype); // check mime type
    const extName = allowedTypes.test(
      file.originalname.split(".").pop().toLowerCase()
    ); // check extension

    if (mimeType && extName) {
      return cb(null, true); // allow the file
    } else {
      cb(new Error("Only .jpg, .png, .gif, .pdf files are allowed"), false); // reject the file
    }
  };

  const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: fileFilter, // Optional, if you want to keep file type validation as well
  });

  return {
    single: upload.single("file"),
    multiple: upload.array("files", 20) // for multiple files, limit to 20 files
  };

};

module.exports = upload_file;
