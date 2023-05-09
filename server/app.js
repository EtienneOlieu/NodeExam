import "dotenv/config";
import express from "express";
const app = express();
const { ATLAS_USERNAME, ATLAS_PASSWORD} = process.env;
console.log(ATLAS_USERNAME, ATLAS_PASSWORD);


import cors from "cors";
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}));

import session from "express-session";
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

const PORT = process.env.PORT || 8080;
app.listen(PORT, (error)=>{
    if(error){
        console.log(error);
    }
    console.log("Server is running on PORT:", PORT);
});