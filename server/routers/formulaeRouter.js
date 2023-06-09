import client from "../databases/connection.js";
import { Router } from "express";
import { user } from "../util/middleware.js";

const router = Router();

const formulae = client.db("hexnetDB").collection("formulae");

//All formulae
router.get("/api/formulae", user, async (req, res) => {
    const allFormulae = await formulae.find().toArray();

    if ( allFormulae.length === 0 ){
        return res.status(404).send({data: "Could not retrieve resource"})
    }
   
    res.status(200).send({ data: allFormulae });
});

export default router;