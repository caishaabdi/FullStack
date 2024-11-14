// import cloudinary from '../config/cloudinry.js';
// import posts from "../models/postModel.js";

// export const createPost = async (req, res) => {
//     try {
//         const currentUser = req.user._id;
//         const { title, content } = req.body;
//         let result;

//         if (req.file) {
//             let encodedImage = `data:image/jpeg;base64,${req.file.buffer.toString('base64')}`;

//             result = await cloudinary.uploader.upload(encodedImage, {
//                 resource_type: 'image',
//                 transformation: [{ width: 500, height: 500, crop: 'limit' }],
//                 encoding: 'base64'
//             });
//         }

//         const post = new posts({
//             title: title,
//             content: content,
//             image: result?.url || null,
//             author: currentUser
//         });

//         await post.save();

//         res.status(201).send(post);

//     } catch (err) {
//         console.log("Error creating post:", err);
//         res.status(400).json({ message: err.message });
//     }
// }




// import cloudinary from '../config/cloudinry.js';
// import posts from "../models/postModel.js";

// export const createPost = async (req, res) => {
//     try {
//         const currentUser = req.user._id;
//         const { title, content } = req.body;
//         let result;

//         if (req.file) {
//             let encodedImage = `data:image/jpeg;base64,${req.file.buffer.toString('base64')}`;

//             result = await cloudinary.uploader.upload(encodedImage, {
//                 resource_type: 'image',
//                 transformation: [{ width: 500, height: 500, crop: 'limit' }],
//                 encoding: 'base64'
//             });
//         }

//         const post = new posts({
//             title: title,
//             content: content,
//             image: result?.url || null,  // Corrected from result?.Url to result?.url
//             author: currentUser
//         });
//         await post.save();
//         res.status(201).send(post);
//     } catch (err) {
//         console.log("Error creating post:", err);
//         res.status(400).json({ message: err.message });
//     }
// }


import cloudinary from '../config/cloudinry.js';

export const createPost = async (req, res) => {
    try {
        const currentUser = req.user._id;
        const { title, content } = req.body;
        let result;

        if (req.file) {
            let encodedImage = `data:image/jpeg;base64,${req.file.buffer.toString('base64')}`;

            result = await cloudinary.uploader.upload(encodedImage, {
                resource_type: 'image',
                transformation: [{ width: 500, height: 500, crop: 'limit' }],
                encoding: 'base64'
            });
        }

        const post = new post({
            title: title,
            content: content,
            image: result?.url || null,  // Ensuring 'url' is in lowercase
            author: currentUser
        });

        await post.save();
        res.status(201).send(post);

    } catch (err) {
        console.log("Error creating post:", err);
        res.status(400).json({ message: err.message });
    }
}
