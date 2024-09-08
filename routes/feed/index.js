import { Router } from "express";
import {
  ScanCommand,
  GetItemCommand,
  PutItemCommand,
  DeleteItemCommand,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import dynamodb from "./db/index.js";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

const router = Router();

// Helper function to scan a DynamoDB table
const scanTable = async (tableName, res) => {
  const params = { TableName: tableName };
  try {
    const data = await dynamodb.send(new ScanCommand(params));
    const items = data.Items.map((item) => unmarshall(item));
    res.json({ items });
  } catch (err) {
    res.status(500).json({
      error: "Failed to retrieve data from the table",
      message: err.message,
    });
  }
};

// Helper function to get a specific item from a DynamoDB table
const getItem = async (tableName, key, res) => {
  const params = {
    TableName: tableName,
    Key: marshall(key),
  };

  try {
    const data = await dynamodb.send(new GetItemCommand(params));
    const item = data.Item ? unmarshall(data.Item) : null;
    if (item) {
      res.json({ item });
    } else {
      res.status(404).json({ error: "Item not found" });
    }
  } catch (err) {
    res.status(500).json({
      error: "Failed to retrieve data from the table",
      message: err.message,
    });
  }
};

// Helper function to insert a new item into a DynamoDB table
const insertItem = async (tableName, itemData, res) => {
  const params = {
    TableName: tableName,
    Item: marshall(itemData),
  };
  try {
    await dynamodb.send(new PutItemCommand(params));
    res.status(201).json({ message: "Item successfully added" });
  } catch (err) {
    console.error("Error adding item:", err);
    res
      .status(500)
      .json({ error: "Failed to add the item", message: err.message });
  }
};

// Helper function to delete an item from a DynamoDB table
const deleteItem = async (tableName, key, res) => {
  const params = {
    TableName: tableName,
    Key: marshall(key),
  };
  try {
    await dynamodb.send(new DeleteItemCommand(params));
    res.status(200).json({ message: "Item successfully deleted" });
  } catch (err) {
    console.error("Error deleting item:", err);
    res
      .status(500)
      .json({ error: "Failed to delete the item", message: err.message });
  }
};

// Helper function to update an item attribute to null
const updateItemToNull = async (tableName, user_id, attribute, res) => {
  const params = {
    TableName: tableName,
    Key: marshall({ user_id }),
    UpdateExpression: `SET ${attribute} = :nullValue`,
    ExpressionAttributeValues: { ":nullValue": { NULL: true } },
  };
  try {
    await dynamodb.send(new UpdateItemCommand(params));
    res.status(200).json({ message: `${attribute} has been set to null` });
  } catch (err) {
    console.error(`Error setting ${attribute} to null:`, err);
    res.status(500).json({
      error: `Failed to set ${attribute} to null`,
      message: err.message,
    });
  }
};

// Route to get all posts
router.get("/posts", (req, res) => scanTable("PostsFeed", res));

// Route to get all clips
router.get("/clips", (req, res) => scanTable("ClipsFeed", res));

// Route to get a specific post
router.get("/posts/:user_id", (req, res) => {
  const { user_id } = req.params;
  if (!user_id) {
    return res.status(400).json({ error: "Missing user_id" });
  }
  getItem("PostsFeed", { user_id }, res);
});

// Route to get a specific clip
router.get("/clips/:user_id", (req, res) => {
  const { user_id } = req.params;
  if (!user_id) {
    return res.status(400).json({ error: "Missing user_id" });
  }
  getItem("ClipsFeed", { user_id }, res);
});

// Route to add a new post
router.post("/posts", (req, res) => {
  const { user_id, posts, timestamp } = req.body;

  if (!user_id || !posts || !timestamp) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  insertItem("PostsFeed", { user_id, posts, timestamp }, res);
});

// Route to add a new clip
router.post("/clips", (req, res) => {
  const { user_id, clips, timestamp } = req.body;

  if (!user_id || !clips || !timestamp) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  insertItem("ClipsFeed", { user_id, clips, timestamp }, res);
});

// Route to delete a post or set its posts attribute to null
router.delete("/posts", (req, res) => {
  const { user_id, setNull } = req.body;

  if (!user_id) {
    return res.status(400).json({ error: "Missing user_id" });
  }

  if (setNull) {
    updateItemToNull("PostsFeed", user_id, "posts", res);
  } else {
    deleteItem("PostsFeed", { user_id }, res);
  }
});

// Route to delete a clip or set its clips attribute to null
router.delete("/clips", (req, res) => {
  const { user_id, setNull } = req.body;

  if (!user_id) {
    return res.status(400).json({ error: "Missing user_id" });
  }

  if (setNull) {
    updateItemToNull("ClipsFeed", user_id, "clips", res);
  } else {
    deleteItem("ClipsFeed", { user_id }, res);
  }
});

export default router;
