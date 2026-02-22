// import multer from "multer";
// import path from "path";
// import fs from "fs";

// const uploadPath = "uploads";
// if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });

// // ✅ Multer storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     cb(null, "student_" + Date.now() + ext);
//   },
// });

// // ✅ File filter
// const fileFilter = (req, file, cb) => {
//   const allowed = ["image/jpeg", "image/jpg", "image/png"];
//   if (allowed.includes(file.mimetype)) cb(null, true);
//   else cb(new Error("Only JPG, JPEG, PNG allowed"));
// };

// // ✅ Upload Middleware
// const uploadStudent = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
// });

// export default uploadStudent;


import multer from "multer";
import path from "path";
import fs from "fs";

// ✅ Base upload folder
const baseUploadPath = "uploads";
if (!fs.existsSync(baseUploadPath)) fs.mkdirSync(baseUploadPath, { recursive: true });

// ✅ Student photos folder (already using this)
const studentUploadPath = path.join(baseUploadPath, "student");
if (!fs.existsSync(studentUploadPath)) fs.mkdirSync(studentUploadPath, { recursive: true });

// ✅ Event photos folder (NEW)
const eventUploadPath = path.join(baseUploadPath, "event");
if (!fs.existsSync(eventUploadPath)) fs.mkdirSync(eventUploadPath, { recursive: true });

// ✅ File filter
const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Only JPG, JPEG, PNG, WEBP allowed"));
};

// ✅ Student storage
const studentStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, studentUploadPath),
  filename: (req, file, cb) =>
    cb(null, "student_" + Date.now() + path.extname(file.originalname)),
});

// ✅ Event storage
const eventStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, eventUploadPath),
  filename: (req, file, cb) =>
    cb(null, "event_" + Date.now() + path.extname(file.originalname)),
});

// ✅ Upload middlewares
export const uploadStudent = multer({
  storage: studentStorage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
});

export const uploadEventPhotos = multer({
  storage: eventStorage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB per file
});
