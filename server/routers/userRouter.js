import client from "../databases/connection.js";
import { Router } from "express";
const router = Router();
import { user, admin } from "../util/middleware.js";

const users = client.db("hexnetDB").collection("users");

// All users
router.get("/api/users", admin, async (req, res) => {
    const allUsers = await users.find().toArray();

    if (allUsers.length === 0){
        return res.status(404).send({data: "Could not retrieve resource"});
    };

    res.status(200).send({ data: allUsers });
});

export default router;