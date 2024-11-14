import express from "express";
import { createPost } from "../controller/postController.js"; // Fixed typo here
import { authenticate } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadCloudinary.js"; // Ensure the filename is correct

const router = express.Router();

router.post('/create-post', authenticate, upload, createPost);

export default router;
