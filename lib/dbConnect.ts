import mongoose, { ConnectionStates } from "mongoose";

type ConnectionObject = {
  isConnected?: ConnectionStates;
};

// This global object survives Hot Reload in Next.js (dev mode)
const globalForMongoose = global as unknown as {
  mongoose: ConnectionObject;
};

const connection: ConnectionObject =
  globalForMongoose.mongoose || { isConnected: undefined };

async function dbConnect(): Promise<void> {
  // Already connected
  if (connection.isConnected) {
    return;
  }

  // No URI, fail early
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("Please define MONGODB_URI in .env");
  }

  try {
    const db = await mongoose.connect(uri);

    connection.isConnected = db.connections[0].readyState;

    globalForMongoose.mongoose = connection;

    console.log("MongoDB connected:", connection.isConnected);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

export default dbConnect;
