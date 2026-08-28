import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
    res.send("Posts page")
})

export default router