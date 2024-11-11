
import User from "../models/UserModel.js";
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';
//Get All Users
export const GetAllUser = async (req, res) => {

    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.json({ message: error.message });
    }
}

// crete User 
export const RegisterUser = async (req, res) => {
    try {
        const { email, password, username } = req.body;
        const isUserExists = await User.findOne({
            $or: [
                { email: email.toLowerCase },
                { username: username.toLowerCase }
            ]
        });
        if (isUserExists) {
            return res.status(400).json("email or username already exists");
        }
        const userInfo = new User({
            username,
            email,
            password
        });
        const RegistedUser = await userInfo.save();
        userInfo.password = undefined;
        return res.status(201).json(RegistedUser);
    } catch (err) {
        console.log("error at registring ", err.message);
        res.json("somthing with wrong" + err.message);
    }
}

// Update User...

export const updateUser = async (req, res) => {

    const { username, email, password } = req.body;
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            user.username = username || user.username;
            user.email = email || user.email;
            user.password = password || user.password;


            const updateduser = user.save();
            res.status(201).json(updateduser);
        } else {
            res.status(404).json({ message: "User Not Found" })
        }


    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}
// Logi User
export const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const isUserExists = await User.findOne({ email: email.toLowerCase() })
            .select("+password");

        if (!isUserExists) {
            return res.status(400).send("Invalid email, please provide a valid email");
        }

        // Password checking
        const isPasswordCorrect = await isUserExists.comparePassword(password);
        if (!isPasswordCorrect) {
            return res.status(400).send("Incorrect Password");
        }

        // Token generation
        // const JWT_SECRET = process.env.JWT_SECRET;
        const expiresIn = 7 * 24 * 60 * 60; // 7 days
        const token = jwt.sign({ _id: isUserExists._id }, JWT_SECRET, { expiresIn });

        // Set cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: false, // Change to `true` in production for HTTPS
            maxAge: expiresIn * 1000
        });

        // Remove password before sending the response
        isUserExists.password = undefined;

        // Send success response
        res.status(200).send({ ...isUserExists.toJSON(), expiresIn });

    } catch (err) {
        console.log("error at LoginUser", err);
        res.status(400).send(err.message);
    }
};
