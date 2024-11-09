import bcrypt from "bcrypt";
import mongoose from "mongoose";
import validator from "validator";

const { Schema } = mongoose; // Correct Schema reference

const userSchema = new Schema(
    {
        email: {
            type: String,
            lowercase: true,
            unique: true,
            required: [true, "Email is required"],
            validate: [validator.isEmail, "Please enter a valid email address"]
        },

        username: {
            type: String,
            lowercase: true,
            unique: true,
            required: [true, "Username is required"]
        },

        password: {
            type: String,
            required: [true, "Password is required"],
            select: false,
            validate: {
                validator: value => validator.isStrongPassword(value),
                message: "Password must contain at least 8 characters, including letters, numbers, and symbols"
            }
        }
    },
    {
        timestamps: true // Automatically adds `createdAt` and `updatedAt` timestamps
    }
);

// Pre-save middleware to hash the password before saving
userSchema.pre("save", async function (next) {

    // Check if the password field has been modified
    if (!this.isModified("password")) return next();

    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next(); // Proceed to save the document
});

// Method to compare a given password with the hashed password in the database
userSchema.methods.comparePassword = async function (givenPassword) {
    return await bcrypt.compare(givenPassword, this.password);
};

// Create and export the User model based on the schema
const User = mongoose.model("User", userSchema);
export default User;
