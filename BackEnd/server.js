
import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js';
import userRouter from './routers/userRouter.js';
// import { RegisterUser } from './controller/userContoller.js';
import cookieParser from 'cookie-parser';
import postRouter from './routers/postRouter.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/api/user', userRouter);
app.use('/api/post', postRouter);

// app.post('/api/register-user', RegisterUser);
app.get('/', (req, res) => {
    res.send
        ('API iS rUNINNNG')
});

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`server lisning on http://localhost:${PORT}`)
});