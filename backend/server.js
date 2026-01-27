import express from 'express';
import dotenv from 'dotenv';  
import cookieParser from 'cookie-parser';

import userRoutes from './routes/user.routes.js'; 
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';

import connectToMongoDB from './db/connectToMongoDB.js';
import { app, server } from './socket/socket.js';
import path from "path";

dotenv.config(); // .env variables cannot be accessed until this line is run . we have to install dotenv for this .

const PORT= process.env.PORT || 5000 ;

// Basic CORS setup so the frontend (e.g. Vercel) can call this API
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", CLIENT_URL);
	res.header("Access-Control-Allow-Credentials", "true");
	res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
	if (req.method === "OPTIONS") {
		return res.sendStatus(200);
	}
	next();
});

app.use(express.json()) //is middleware that parses incoming JSON request bodies and makes the data available in req.body .

app.use(cookieParser()); // It reads cookies from the HTTP request .Makes cookies available in req.cookies

app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/users', userRoutes);
 
server.listen(PORT, ()=>{ 
    connectToMongoDB();
    console.log(`server is running on port ${PORT}`)});