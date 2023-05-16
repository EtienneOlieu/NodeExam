import client from "../databases/connection.js";
import { Router } from "express";
const router = Router();
import bcrypt from "bcrypt";

const users = client.db("hexnetDB").collection("users");

// All users
router.get("/api/users", async (req, res) => {
    const allUsers = await users.find({ privilege: "user" }).toArray();
   
//TODO DELETE
console.log("THIS IS A FETCH OF ALL USERS: ", allUsers);

    if (!allUsers){
        return res.status(404).send({message: "Could not retrieve resource"});
    };
    res.status(200).send({
        message: allUsers
    })

})

//Logout
router.get("/api/users/logout", async (req, res) => {
    req.session.destroy(()=>{
        res.status(200).send({message: "Logged out"})
    });
});

//Login
router.post("/api/users/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await users.find({email: `${email}`});

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

    //TODO DELETE
    console.log("THIS IS A LOG OF THE SESSION USER: ", req.session.user);

    res.status(200).send(req.session.user);
});

//Create new user
router.post("/api/users/createuser", async (req, res) => {
    console.log(req.body);
    const { name, email, password } = req.body;

    const checkForExistingName = await users.find({ name: `${name}`});
    const checkForExistingEmail = await users.find({ email: `${email}`});

    if(!checkForExistingName && !checkForExistingEmail){

        const hashedPw = await bcrypt.hash(password, 12);

        const newUser = {name: `${name}`, email: `${email}`, password: `${hashedPw}`, privilege: "user"}
        const result = await users.insertOne(newUser);


        return res.status(201).send({data: `User: ${name} successfully created.`, data: result.insertedIds})
    }
    else {
        return res.status(404).send({data: "Name or Email is already in use."})
    }
});

export default router;