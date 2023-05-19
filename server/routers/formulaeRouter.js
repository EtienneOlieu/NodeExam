import client from "../databases/connection.js";
import { Router } from "express";
const router = Router();

const formulae = client.db("hexnetDB").collection("formulae");

//All formulae
router.get("/api/formulae", async (req, res) => {
    const allFormulae = await formulae.find().toArray();

    if ( allFormulae.length === 0 ){
        return res.status(404).send({data: "Could not retrieve resource"})
    }
   
    res.status(200).send({data: allFormulae});
});

router.get("/api/formulae/id", async (req, res) => {
    const searchedFormulae = req.query;

    
});

export default router;