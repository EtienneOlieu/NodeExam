import client from "../databases/connection.js";
import { Router } from "express";
const router = Router();
import bcrypt from "bcrypt";

const users = client.db("hexnetDB").collection("users");

//Logout
router.get("/api/logout", async (req, res) => {
    req.session.destroy(()=>{
        res.status(200).send({data: "Logged out"})
    });
});

//Login
router.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await users.findOne({email: `${email}`});

    if (!user){
        return res.status(404).send({data: "User does not exist."});
    };

    const userPassword = await bcrypt.compare(password, user.password);

    if (!userPassword){
        return res.status(400).send({data: "Invalid password"});
    };

    req.session.user = {
        name: user.name, email, privilege: user.privilege
    };
    console.log("SESSION_USER:", req.session.user);

    res.status(200).send(req.session.user);
});

//Create new user
router.post("/api/createuser", async (req, res) => {
    console.log(req.body);
    const { name, email, password } = req.body;

    const checkForExistingName = await users.findOne({ name: `${name}`});
    const checkForExistingEmail = await users.findOne({ email: `${email}`});

    if(!checkForExistingName && !checkForExistingEmail){

        const hashedPw = await bcrypt.hash(password, 12);

        const newUser = {name: `${name}`, email: `${email}`, password: `${hashedPw}`, privilege: "user"}
        const result = await users.insertOne(newUser);


        return res.status(201).send({data: name});
    }
    else {
        return res.status(404).send({data: "Name or Email is already in use."})
    }
});

export default router;