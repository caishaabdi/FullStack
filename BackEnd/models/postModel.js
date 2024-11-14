import mongoose from "mongoose";

const { Schema } = mongoose;

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
        validate: [value => value.length < 500, 'content should be up 500 ']
    },
    image: {
        type: String,  // This will store the URL/path to the image
        default: null
    },
    author: {
        type: Schema.Types.ObjectId, // Corrected here
        ref: 'User',  // Referencing the User model
        required: true
    }
});

const post = mongoose.model("post", PostSchema);
export default post;
