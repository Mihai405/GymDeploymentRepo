const multer = require("multer");

const uploadImage = multer({
  limits: 2000000,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload an image"));
    }
    cb(undefined, true);
  },
});

module.exports = uploadImage;
