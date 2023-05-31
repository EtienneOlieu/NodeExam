import client from "../databases/connection.js";
import { Router } from "express";

const router = Router();

const chatlog = client.db("hexnetDB").collection("chatlog");

router.get("/api/chatmessages", async (req, res) => {
    const messages = await chatlog.find().toArray();
    if(messages.length === 0){
        return res.status(404).send({data: "Could not retrieve resource"})
    }
    return res.status(200).send({ data: messages });
});

export async function saveMessage(message) {
    await chatlog.insertOne(message);
}

export default router;