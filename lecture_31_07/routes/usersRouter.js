import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.send("Users page")
})

router.get("/:user_id", (req, res) => {
    res.send(`Users page, ${req.user.name}`)
})

export default router