// import express from 'express';
// import connectDB from './config/db.js';
// import userRouter from './routers/userRouter.js';
// import cookieParser from 'cookie-parser';
// import postRouter from './routers/postRouter.js';
// connectDB();

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cookieParser());

// // Routes
// app.use('/api/user', userRouter);
// app.use('/api/post', postRouter);

// app.get('/', (req, res) => {
//     res.send('API IS RUNNING');
// });

// // Start the server
// const PORT = 8080
// app.listen(PORT, () => {
//     console.log(`Server listening on http://localhost:${PORT}`);
// });












import express from 'express';
import connectDB from './config/db.js';
import userRouter from './routers/userRouter.js'
import cookiesParser from 'cookie-parser';
import PostRouter from './routers/postRouter.js';
// import PostRouter from './routers/postRouter.js';

const app = express();
const PORT = 8080;

// Connect to the databas
connectDB();

// Middleware to parse JSON
app.use(express.json());
app.use(cookiesParser());

// Define routes
app.use('/api/user', userRouter);

app.use('/api/post', PostRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on:http://localhost:${PORT}`);
});
