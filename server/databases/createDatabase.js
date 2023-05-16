import client from "./connection.js";
import bcrypt from "bcrypt";

const db = await client.db("hexnetDB");
const collectionUsers = await db.collection("users");
const collectionFormulae = await db.collection("formulae");

const isDeleteMode = process.argv.findIndex((argument) => argument === "delete_mode") === -1 ? false : true;

if (isDeleteMode){
    await db.dropCollection("users");
    await db.createCollection("users");
    await db.dropCollection("formulae");
    await db.createCollection("formulae");
}

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

collectionUsers.insertMany(sampleUsers, (error, result) => {
    if (error) {
        console.log("Failed insert into users:", error);
        return;
    }
    console.log("Inserted users:", result.insertedCount);
});


const sampleFormulae = [
    {
        "name":"Love Potion",
        "ingredients": [{"Eye of newt": {"amount": 2}}, {"Wing of bat": {"amount": 1}}, {"Hair from a lover spurned": {"strands": 3}}],
        "temperature": 250,
        "time": 660,
        "description":"The classic love potion, used countless times whenever, a hapless fool needs a person to fall for them. This particular version of the recipe does have the drawback, that it colors the imbiber's tongue bright green.",
        "effect": "Causes a person to fall in love with the first person they see.",
    },
    {
        "name":"Powder of Transformation",
        "ingredients": [{"Dragonscale": {"amount": 1}}, {"Human heart(dried)": {"amount": 1}}, {"Lizard tail": {"amount": 4}}, {"Amniotic fluid(fresh)": {"ml": 300}}],
        "temperature": 500,
        "time": 120,
        "description":"This finely ground powder allows anyone who covers themselves in it and chants the seven names of darkness under a gibbous moon the boon of transformation. Upon the completion of this endeavour the user will be transformed into a creature of their choosing, provided they have seen it with their own eyes.",
        "effect": "Transforms a person into a knowns animal.",
    },
    {
        "name":"Mixture of Eternal Sleep",
        "ingredients": [{"Sand": {"g": 200}}, {"Olive Oil": {"ml": 120}}, {"Goat brains": {"g": 1000}}],
        "temperature": 90,
        "time": 180,
        "description": "This classic potion is great for getting rid of a rival or pesky witch hunters, without raisning the suspicion that killing usually entails. Remember to chant your grievances against the intended target under the full moon. Otherwise, the dark man will not hear it, and your mixture will be inert.",
        "effect": "A person drinking this scentless and tasteless mixture will fall asleep, never to wake again.",
    },
    {
        "name":"Potion of quickness",
        "ingredients": [{"Cricket leg(s)": {"amount": 1}}, {"chili pepper": {"g": 60}}],
        "temperature": 210,
        "time": 45,
        "description": "This sour potion is fairly quick to make and will allow you to move faster than the eye can see, for short bursts.",
        "effect": "Allows for super human speed.",
    },
];

collectionFormulae.insertMany(sampleFormulae, (error, result) => {
    if (error) {
        console.log("Failed insert into formulae:", error);
        return;
    }
    console.log("Inserted formulae:", result.insertedCount);
});
