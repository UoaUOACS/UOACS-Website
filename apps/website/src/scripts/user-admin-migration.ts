import { MongoClient } from "mongodb"

const uri = process.env.DATABASE_URI
if (!uri) throw new Error("DATABASE_URI is not set")

const client = new MongoClient(uri)
try {
  await client.connect()
  const db = client.db()

  const [usersCol, adminsCol] = await Promise.all([
    db.listCollections({ name: "users" }).toArray(),
    db.listCollections({ name: "admins" }).toArray(),
  ])

  if (usersCol.length === 0) {
    console.log("No 'users' collection found — nothing to rename.")
  } else if (adminsCol.length !== 0) {
    console.log("'admins' collection already exists — migration already applied.")
  } else {
    await db.collection("users").rename("admins")
    console.log("Renamed 'users' collection to 'admins'.")
  }
} catch (error) {
  console.error("An error occurred during the migration:", error)
} finally {
  await client.close()
}
