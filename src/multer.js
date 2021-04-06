const multer = require('multer');
const shortid = require('shortid');
// const storage = multer.diskStorage({});
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
// const storage = new CloudinaryStorage({
//   cloudinary,
//   allowedFormats: ['jpg', 'png', 'jpeg'],
//   filename: function (req, file, cb) {
//     cb(null, file.originalname + '-' + Date.now());
//   },
// });
// const uploadCloud = multer({ storage });
// module.exports = uploadCloud;
module.exports = multer({
  storage,
  fileFilter: (req, file, cb) => {
    // Lọc file trước khi tải lên
    if (!file.mimetype.match(/jpe|jpeg|png|gif$i/)) {
      cb(new Error('File is not supported'), false);
      return;
    }
    cb(null, true);
  },
});
