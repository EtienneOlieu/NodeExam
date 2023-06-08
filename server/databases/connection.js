import "dotenv/config";
import { MongoClient } from "mongodb";

const URL = `mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}@hexnet0.tuck7e0.mongodb.net/?retryWrites=true&w=majority`

const client = new MongoClient(URL, {useNewUrlParser: true, useUnifiedTopology: true});

await client.connect();

export default client;