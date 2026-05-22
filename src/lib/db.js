// src/lib/db.js
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
let client;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

export async function connectDB() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
  return client.db("tutor"); // আপনার ডাটাবেসের নাম
}