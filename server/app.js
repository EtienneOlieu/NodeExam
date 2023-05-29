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

import rateLimit from "express-rate-limit";

const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(apiLimiter);

import session from "express-session";
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

import logRouter from "./routers/loginRouter.js";
app.use(logRouter);


import userRouter from "./routers/userRouter.js";
app.use(userRouter);

function restrictedUserAuth (req, res, next){
    if (req.session.privilege !== "admin"){
        return res.status(403).send({data: "restricted resource"})
    };
    next();
};


import formulaeRouter from "./routers/formulaeRouter.js"
app.use(formulaeRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, (error)=>{
    if(error){
        console.log(error);
    }
    console.log("Server is running on PORT:", PORT);
});