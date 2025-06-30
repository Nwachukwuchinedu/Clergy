import multer from "multer";
import { uploadToSupabase } from "../utils/uploadToSupabase.js";

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const uploadImageToSupabase = async (req, res, next) => {
  if (!req.file) return next();

  try {
    const filePath = `uploads/${Date.now()}-${req.file.originalname}`;
    const result = await uploadToSupabase(req.file.buffer, filePath);

    if (result.error) throw new Error(result.error);

    req.fileUrl = result.url;
    next();
  } catch (err) {
    res.status(500).json({ error: "Image upload failed" });
  }
};

// Use this as multer middleware
export default upload;