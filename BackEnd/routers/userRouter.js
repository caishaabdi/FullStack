import express from "express";

import {
    LoginUser, RegisterUser
} from '../controllers/userContoller.js'
const router = express.Router();

router.post('/register-user', RegisterUser);
router.post('/login-user', LoginUser);
export default router;


