import { MongoClient } from "mongodb"

if (!process.env.DATABASE_URI) {
  throw new Error("DATABASE_URI environment variable is not set")
}

export const mongoClient = globalThis.mongoClient ?? new MongoClient(process.env.DATABASE_URI)

if (process.env.NODE_ENV !== "production" && !globalThis.mongoClient) {
  globalThis.mongoClient = mongoClient
}
