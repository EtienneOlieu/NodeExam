import db from "./connection.js";
import bcrypt from "bcrypt";

const isDeleteMode = process.argv.findIndex((argument) => argument === "delete_mode") === -1 ? false : true;

if (isDeleteMode){
    db.dropCollection("users");
    db.createCollection("users");
}

const collection = db.collection("users");

const lindaPW = await bcrypt.hash("valentin", 12);
const isabellaPw = await bcrypt.hash("hexenNacht1714", 12);
const cassandraPW = await bcrypt.hash("satan4life", 12);
const lillithPW = await bcrypt.hash("darkmthr", 12);
const adminPW = await bcrypt.hash("1234", 12);


const sampleUsers = [
    {
    "name": "Linda Mørkesol",
    "email": "solnat@mail.com",
    "password": `${lindaPW}`,
    "privilege": "user"
    },
    {
    "name": "Isabella Mortensen1",
    "email": "mort@mail.com",
    "password": `${isabellaPw}`,
    "privilege": "user"
    },
    {
    "name": "Cassandra Rose",
    "email": "rose@mail.com",
    "password": `${cassandraPW}`,
    "privilege": "user"
    },
    {
    "name": "Lillith Jensen",
    "email": "lille@mail.com",
    "password": `${lillithPW}`,
    "privilege": "user"
    },
    {
    "name": "ADMIN",
    "email": "admin@mail.com",
    "password": `${adminPW}`,
    "privilege": "admin"
    }, 
];

collection.insertMany(sampleUsers, (error, result) => {
    if (error) {
        console.log("Failed insert into users:", error);
        return;
    }
    console.log("Inserted users:", result.insertedCount());
})
