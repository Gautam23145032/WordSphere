    import express from "express";
    import client from "../config/redis.js";

    const router = express.Router();

    router.get("/", async (req, res) => {
    const words = await client.zRange(
        "trending_words",
        0,
        4,
        {
        REV: true,
        }
    );

    res.json(words);
    });

    export default router;