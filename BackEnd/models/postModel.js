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
        type: String,  //his will be store URL/path to the image
        default: null
    },
    author: {
        type: Schema.Type.ObjectId,
        ref: 'User',  //refrencing the User Model
        required: true
    }
});

const post = mongoose.model("post", PostSchema);
export default post;
