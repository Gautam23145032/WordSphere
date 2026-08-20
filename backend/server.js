import express from "express";
import cors from "cors";
import { connectRedis } from "./config/redis.js";
import pool from "./config/db.js";
import wordRoutes from "./routes/wordRoutes.js";
import trendingRoutes from "./routes/trendingRoutes.js";
import suggestionRoutes from "./routes/suggestionRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js"
import authRoutes from "./routes/authRoutes.js";
import "./config/webpush.js";
import "./cron/wordOfTheDayCron.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use( "/api/suggestions", suggestionRoutes);
app.use( "/api/auth", authRoutes);
app.use(
    "/api/notifications",
    notificationRoutes
);
app.get("/", (req, res) => {
  res.send("WordSphere API Running");
});

app.use("/api/words", wordRoutes);
app.use("/api/trending", trendingRoutes);
const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectRedis();

    const result = await pool.query("SELECT NOW();");

    console.log(
      "Database Connected:",
      result.rows[0]
    );

    app.listen(PORT, () => {
      console.log(
        `Server running on port ${PORT}`
      );
    });

  } catch (error) {
    console.log(error);
  }
}

startServer();