import express from 'express';
import dotenv from 'dotenv';  
import cookieParser from 'cookie-parser';

import userRoutes from './routes/user.routes.js'; 
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';

import connectToMongoDB from './db/connectToMongoDB.js';



const app= express();
const PORT= process.env.PORT || 5000 ;


dotenv.config(); // .env variables cannot be accessed until this line is run . we have to install dotenv for this .

app.use(express.json()) //is middleware that parses incoming JSON request bodies and makes the data available in req.body .

app.use(cookieParser()); // It reads cookies from the HTTP request .Makes cookies available in req.cookies

app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/users', userRoutes);
 
// app.get('/',(req,res)=>{
//    res.send('hello world')
// })




app.listen(PORT, ()=>{ 
    connectToMongoDB();
    console.log(`server is running on port ${PORT}`)});