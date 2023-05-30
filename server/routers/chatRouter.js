import { Router } from "express";
import client from "../databases/connection.js";

const router = Router();

const chatlog = client.db("hexnetDB").collection("chatlog")

router.get("api/chatMessages", async (req, res) => {
const messages = await chatlog.find().toArray();
const chatArray = [];

messages.forEach(message => {
chatArray.push(message);
})
return res.status(200).send({data: chatArray});
});

async function saveMessage(message){
    await chatlog.insertOne(message);
}

export default { router, saveMessage }