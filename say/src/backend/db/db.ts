import { MongoClient, Db } from 'mongodb';

const credentials = "SWFaZ3lZQlNz";
const username = "Cluster01576";

// TODO: extract to env vars
const uri = process.env.MONGODB_URI || `mongodb+srv://${username}:${credentials}@cluster01576.ne1cnpq.mongodb.net/?retryWrites=true&w=majority`; // Replace with your MongoDB connection string
const dbName = process.env.MONGODB_DB || 'mike-dev';

let cachedDb: Db;

export async function connectToDatabase(): Promise<Db> {
	if (cachedDb) {
		return cachedDb;
	}

	const client = await MongoClient.connect(uri);
	const db = client.db(dbName);
	cachedDb = db;
	return db;
}

