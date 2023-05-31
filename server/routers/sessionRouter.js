import { Router } from "express";
const router = Router();
import { user } from "../util/middleware.js";

router.get("api/session", async (req, res) => {
    const sessionData = {
        name: req.session.name,
        privilege: req.session.privilege,
    };
    res.json(sessionData);
});

export default router;