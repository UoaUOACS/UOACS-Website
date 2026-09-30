import type { MongoClient } from "mongodb"

declare global {
  var mongoClient: MongoClient | undefined
}
