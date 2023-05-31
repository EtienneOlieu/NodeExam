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
const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
});
app.use(sessionMiddleware);

import http from "http";
const server = http.createServer(app);

import { Server } from "socket.io";
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["*"],
    }
});

const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
io.use(wrap(sessionMiddleware));

import { saveMessage } from "./routers/chatRouter.js";

io.on("connection", (socket) => {
    console.log("socket connected:", socket.id);

    socket.on("new message", async message => {
        await saveMessage(message);
        io.emit("message from server", message);
    })
})

import logRouter from "./routers/loginRouter.js";
app.use(logRouter);


import userRouter from "./routers/userRouter.js";
app.use(userRouter);

import formulaeRouter from "./routers/formulaeRouter.js";
app.use(formulaeRouter);

import chatRouter from "./routers/chatRouter.js";
app.use(chatRouter);

const PORT = process.env.PORT || 8080;
server.listen(PORT, (error)=>{
    if(error){
        console.log(error);
    }
    console.log("Server is running on PORT:", PORT);
});