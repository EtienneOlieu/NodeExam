import client from "../databases/connection.js";
import { Router } from "express";
import { user, admin } from "../util/middleware.js"
const router = Router();
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

const users = client.db("hexnetDB").collection("users");

//Logout
router.get("/api/logout", user, async (req, res) => {
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
        name: user.name, email, privilege: user.privilege, id: user._id
    };
    res.status(200).send(req.session.user);
});

//Create new user
router.post("/api/createuser", async (req, res) => {
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

//edit user
router.patch("/api/patchuser/:name", async (req, res) =>{
    try {
    const { newName, newEmail, newPassword } = req.body;
    const existingUserName = req.params.name;

    const existingUser = await users.findOne({ name: `${existingUserName}` });
    
    let newHashedPW;
    if (newPassword) {
        newHashedPW = await bcrypt.hash(newPassword, 12);
    } else {
        newHashedPW = existingUser.password;
    };
    
    if (newName && newName !== existingUser.name){
        const checkForExistingName = await users.findOne({ name: newName });
        if (checkForExistingName){
            return res.status(400).send({data: "Name is already in use"});
        }
    }

    if (newEmail && newEmail !== existingUser.email){
        const checkForExistingEmail = await users.findOne({ email: `${newEmail}` });
        if(checkForExistingEmail){
            return res.status(400).send({data: "Email is already in use"});
        }
    }

   const updateData = {
    name: newName || existingUser.name,
    email: newEmail || existingUser.email,
    password: newHashedPW,
   }

   await users.updateOne({ name: existingUserName }, { $set: updateData });
   res.status(200).send({ data: updateData });

} catch (error){
    console.error("An error has occured: ", error);
    res.status(500).send({ data: "An internal server error has occured"});
};
});

export default router;