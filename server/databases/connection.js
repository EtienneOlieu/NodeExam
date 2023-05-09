import "dotenv/config"

import { MongoClient, ServerApiVersion } from "mongodb";


const URL = `mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}@hexnet0.tuck7e0.mongodb.net/?retryWrites=true&w=majority`

const client = new MongoClient(URL, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

const db = await client.db("hexnetDB");
export default db;
