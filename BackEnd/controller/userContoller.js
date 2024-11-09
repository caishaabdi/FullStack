
import User from "../models/UserModel.js";


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