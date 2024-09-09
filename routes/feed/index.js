import { Router } from "express";
import { getItem } from "../../controllers/dynamoDbController.js";
import { getFeed } from "../../controllers/feedController.js";
const router = Router();

// Route to get a specific user's posts
router.get("/posts", (req, res) => {
  const { userId, interactions } = req.body;
  if (!userId || !interactions ) {
    return res.status(400).json({ error: "All inputs are necessary" });
  }
  getItem("PostsFeed", { user_id: userId }, res);

  // Get all interactions from the client
  // Pass the retrieved data to the feed controller
  // After a final processing return the response back to the client

  getFeed(userId, interactions);

});

// Route to get a specific user's clips
router.get("/clips", (req, res) => {
  const { userId, interactions } = req.body;
  if (!userId || !interactions) {
    return res.status(400).json({ error: "All inputs are necessary" });
  }
  getItem("ClipsFeed", { user_id: userId }, res);
});

export default router;
