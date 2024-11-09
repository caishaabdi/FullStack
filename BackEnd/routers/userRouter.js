import express from "express";

import {
    GetAllUser, RegisterUser, updateUser
} from '../controller/userContoller.js'
const router = express.Router();

router.route('/').post(RegisterUser).get(GetAllUser);
router.route('/:id').put(updateUser);

export default router;


