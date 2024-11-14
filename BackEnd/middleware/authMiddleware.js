// import jwt from 'jsonwebtoken';

// const JWT_SECRET = process.env.JWT_SECRET;

// export const authenticate = (req, res, next) => {

//     const token = req.cookies.token;
//     // console.log("tokennnn", token);

//     if (!token)
//         return res.status(403).send("Access denied please Login..");

//     try {
//         const decoded = jwt.verify(token, JWT_SECRET);
//         console.log("decoded", decoded);
//         // next();
//     } catch (error) {
//         console.log('errr', error)
//     }

// }



import jwt from 'jsonwebtoken';


export const authenticate = (req, res, next) => {
    const token = req.cookies.token;
    // console.log("tokennnn", token);

    if (!token) {
        return res.status(403).send("Access denied, please login.");
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded", verified);
        req.user = verified;

    } catch (error) {
        // console.error("Token verification error:", error);
        // res.status(401).json({ message: "Invalid or expired token" });
    }

};

