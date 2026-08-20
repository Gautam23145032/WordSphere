import express from "express";
import client from "../config/redis.js";
import { searchWord } from "../controllers/wordController.js";

const router = express.Router();

router.get("/:word", searchWord);

export default router;