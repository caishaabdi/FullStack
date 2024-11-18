import express from 'express';
import { createPost } from '../controllers/postController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadCloudinry.js';


const PostRouter = express.Router();

// Route to create a post with authentication and file upload
PostRouter.post('/create-Post', authenticate, upload.single('image'), createPost);

export default PostRouter;
