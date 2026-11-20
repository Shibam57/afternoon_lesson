const { MongoClient } = require("mongodb");

let client;
let database;


async function connectDB() {
  if (database) return database;

  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not configured");
  }

  client = new MongoClient(process.env.MONGODB_URI);
  try {
    await client.connect();
    database = client.db(process.env.DB_NAME || "afterschool");
    await database.command({ ping: 1 });
    console.log("MongoDB connected successfully");
    return database;
  } catch (error) {
    await client.close();
    client = undefined;
    database = undefined;
    throw error;
  }
}


function getCollection(name) {
  if (!database) {
    throw new Error("MongoDB is not connected. Call connectDB() first.");
  }
  return database.collection(name);
}

async function closeDB() {
  if (client) await client.close();
  client = undefined;
  database = undefined;
}

module.exports = { connectDB, getCollection, closeDB };
