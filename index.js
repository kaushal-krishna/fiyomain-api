import express from "express";
import dotenv from "dotenv";
import feedRouter from "./routes/feed/index.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/feed", feedRouter);

app.get("/", (req, res) => {
  res.send("Hello from Lambda!");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;