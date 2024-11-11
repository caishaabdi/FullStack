
import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js';
import userRouter from './routers/userRouter.js';
import { RegisterUser } from './controller/userContoller.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/user', userRouter);

// app.post('/api/register-user', RegisterUser);
app.get('/', (req, res) => {
    res.send
        ('API iS rUNINNNG')
});

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`server lisning on http://localhost:${PORT}`)
});