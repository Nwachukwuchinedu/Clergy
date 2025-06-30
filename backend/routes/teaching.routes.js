import express from "express";
import Teaching from "../models/Teaching.js";
import upload from "../utils/upload.utils.js";
import { authJwt } from "../middleware/authJwt.js";

const router = express.Router();

// GET all teachings
router.get("/", async (req, res) => {
  try {
    const teachings = await Teaching.find()
      .select("-__v")
      .sort({ createdAt: -1 });
    res.json(teachings);
  } catch (err) {
    res.status(500).json({ message: "Error fetching teachings" });
  }
});

// GET single teaching
router.get("/:id", async (req, res) => {
  try {
    const teaching = await Teaching.findById(req.params.id).select("-__v");
    if (!teaching)
      return res.status(404).json({ message: "Teaching not found" });
    res.json(teaching);
  } catch (err) {
    res.status(500).json({ message: "Error fetching teaching" });
  }
});

// POST new teaching
router.post("/", authJwt, upload.single("image"), async (req, res) => {
  const { title, body, youtubeUrl } = req.body;

  try {
    // Validate required fields
    if (!title || !body) {
      return res.status(400).json({ message: "Title and body are required" });
    }

    let imageUrl = null;

    // If an image was uploaded, get its Cloudinary URL
    if (req.file) {
      imageUrl = req.file.path; // Cloudinary URL is stored in `path`
    }

    // Create new teaching
    const teaching = new Teaching({
      title,
      body,
      image: imageUrl,
      youtubeUrl,
    });

    await teaching.save();

    res.status(201).json(teaching);
  } catch (err) {
    console.error("Error creating teaching:", err);
    res.status(500).json({ message: "Error creating teaching" });
  }
});

export default router;
