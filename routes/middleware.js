const multer = require("multer");
const path = require("path");

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/storage");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

exports.upload = multer({ dest: "../public/storage/", storage: diskStorage });
