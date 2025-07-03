const multer = require("multer");
const path = require("path");
const fs = require("fs");


/**
 * Description placeholder
 *
 * @param {{ dirPath?: string; fileName?: any; }} param0 
 * @param {string} [param0.dirPath="/"] 
 * @param {*} [param0.fileName=null] 
 * @returns {*} 
 */
function uploadFile({ dirPath = "/", fileName = 'file-name' }) {
  const storage = multer.diskStorage({
    destination: async function (req, file, cb) {
      const dir = path.basename("public") + dirPath;
      if (!fs.existsSync(dir)) {
        await fs.mkdirSync(dir, { recursive: true });
      }
      cb(null, dir);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = fileName + '-' + Date.now();
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  });

/**
 * File filter for uploaded files.
 *
 * @param {*} req - The request object.
 * @param {*} file - The file object.
 * @param {*} cb - The callback function.
 * @returns {void}
 */
  // const fileFilter = (req, file, cb) => {
  //   const allowedTypes = /jpg|jpeg|png|gif|pdf/; // allowed extensions
  //   const mimeType = allowedTypes.test(file.mimetype); // check mime type
  //   const extName = allowedTypes.test(
  //     file.originalname.split(".").pop().toLowerCase()
  //   ); // check extension

  //   if (mimeType && extName) {
  //     return cb(null, true); // allow the file
  //   } else {
  //     cb(new Error("Only .jpg, .png, .gif, .pdf files are allowed"), false); // reject the file
  //   }
  // };

  const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    // fileFilter: fileFilter, // Optional, if you want to keep file type validation as well
  });

  return upload;

  // return {
  //   single: upload.single("file"),
  //   multiple: upload.array("files", 20), // for multiple files, limit to 20 files
  // };
}

module.exports = uploadFile;
