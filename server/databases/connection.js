import "dotenv/config";
import { MongoClient } from "mongodb";

const URL = `mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}@hexnet0.tuck7e0.mongodb.net/?retryWrites=true&w=majority`

const client = new MongoClient(URL, {useNewUrlParser: true, useUnifiedTopology: true});

await client.connect();

/* async function run(){
  try {
    await client.connect();
    
    //DB & Collections
    const db = await client.db("hexnetDB");
    const users = db.collection("users");
    const formulae = db.collection("formulae");

    //Find
    const userCursor = collectionUsers.find();
    const formulaeCursor = collectionFormulae.find();
    const specificFormulae = collectionFormulae.find({temperature:{$gt:200}});

    //Iterate

    for await (const user of userCursor) {
      console.log(user);
    }
    
    for await (const formulae of formulaeCursor) {
      console.log(formulae);
    }

    for await (const formulae of specificFormulae){
      console.log(formulae);
    };

  } finally {
    await client.close();
  }
}
run().catch(console.dir);
 */
export default client;