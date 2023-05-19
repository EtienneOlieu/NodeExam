import "dotenv/config";
import express from "express";
const app = express();
app.use(express.json());

import cors from "cors";
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}));

import helmet from "helmet"
app.use(helmet());

import session from "express-session";
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

import userRouter from "./routers/userRouter.js";
app.use(userRouter);

import formulaeRouter from "./routers/formulaeRouter.js"
app.use(formulaeRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, (error)=>{
    if(error){
        console.log(error);
    }
    console.log("Server is running on PORT:", PORT);
});