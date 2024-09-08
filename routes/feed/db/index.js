import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import dotenv from "dotenv";

dotenv.config();

const dynamodb = new DynamoDBClient({
  region: process.env.AWS_REGION,
  endpoint: process.env.DYNAMODB_ENDPOINT,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export default dynamodb;
