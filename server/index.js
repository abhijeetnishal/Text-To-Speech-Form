import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import formRouter from './routers/formRouter.js';

//configure env
dotenv.config();

//create an express instance
const app = express();

//To parse the incoming requests with JSON we are using express.json() which is a built-in middleware function in Express.
app.use(express.json());

//The cookie-parser middleware is used to parse cookies from incoming requests, making them available in the req.cookies object.
app.use(cookieParser());

//Define port
const port = process.env.Port || 8080;

//This will allow the user in the frontend to consume the APIs that you have created without any problem.
app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));

//form router
app.use('/form', formRouter);

//get request when server is live
app.get('/', (req, res) => {
    res.status(200).json('Server is Live');
})

app.listen(port, () => {
    console.log('Server listening at port ' + port);
})