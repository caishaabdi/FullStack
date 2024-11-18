import cloudinary from '../config/cloudinry.js';
import Post from '../models/post.js';

// Ensure the path is correct

export const createPost = async (req, res) => {
    try {
        const currentUser = req.user.id;
        console.log("currentUser:", currentUser)
        const { title, content } = req.body;

        let result;
        if (req.file) {
            const encodedImage = `data:image/jpeg;base64,${req.file.buffer.toString('base64')}`;
            result = await cloudinary.uploader.upload(encodedImage, {
                resource_type: 'image',
                transformation: [
                    { width: 500, height: 500, crop: 'limit' },

                ],
                encoding: 'base64'

            });

        }

        const post = new Post({
            title: title,
            content: content,
            image: result?.url || null,
            author: currentUser,
        });

        await post.save();
        res.status(201).send(post);
    } catch (error) {
        console.log("Error creating post", error);
        res.status(400).send(error);
    }
};
