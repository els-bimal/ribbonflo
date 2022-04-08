import { MongoClient } from 'mongodb';
const url = 'mongodb://localhost:27017';
let db = null;

export async function connectDB() {
  if (db) {
    return db;
  }

  let client = await MongoClient.connect(url, { useNewURLParser: true });
  db = client.db('ribbonfloDB');
  console.info('got db', db);
  return db;
}

//connectDB()
