import { MongoClient, Db } from 'mongodb';

const uri = process.env.DATABASE_URL!;

const globalForMongo = globalThis as unknown as {
  _mongoClient: MongoClient | undefined;
};

let client: MongoClient;

if (process.env.NODE_ENV === 'development') {
  if (!globalForMongo._mongoClient) {
    globalForMongo._mongoClient = new MongoClient(uri);
  }
  client = globalForMongo._mongoClient;
} else {
  client = new MongoClient(uri);
}

export async function getDb(): Promise<Db> {
  await client.connect();
  return client.db();
}
