import express from "express";

import {
    GetAllUser, LoginUser, RegisterUser, updateUser
} from '../controller/userContoller.js'
const router = express.Router();

// router.route('/').post(RegisterUser).get(GetAllUser);
// router.route('/:id').put(updateUser);
router.post('/register-user', RegisterUser);
router.post('/login-user', LoginUser);
export default router;


