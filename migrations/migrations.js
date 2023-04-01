const MongoClient = require('mongodb').MongoClient;
const credentials = "SWFaZ3lZQlNz";
const username = "Cluster01576";

// TODO: extract to env vars
const uri = process.env.MONGODB_URI || `mongodb+srv://${username}:${credentials}@cluster01576.ne1cnpq.mongodb.net/?retryWrites=true&w=majority`; // Replace with your MongoDB connection string
const dbName = process.env.MONGODB_DB || 'mike-dev';

let cachedDb;

async function connectToDatabase() {
	if (cachedDb) {
		return cachedDb;
	}

	const client = await MongoClient.connect(uri);
	const db = client.db(dbName);
	cachedDb = db;
	return db;
}

async function _migrateBotInterface() {
	const db = await connectToDatabase();
	const botCollection = db.collection('bots');

	const bots = await botCollection.find().toArray();

	for (const bot of bots) {
		const updatedBot = {
			...bot,
			type: 'chat',
			config: {
				systemMessage: bot.systemMessage,
			},
		};
		delete updatedBot.systemMessage;

		await botCollection.replaceOne({ _id: bot._id }, updatedBot);
		console.log(`Migrated bot ${bot._id}: updated to the new Bot object.`);
	}
}
async function migrateToTypeConfig() {
	const db = await connectToDatabase();
	const botCollection = db.collection('bots');

	const bots = await botCollection.find().toArray();

	for (const bot of bots) {
		const updatedBot = {
			...bot,
			config: {
				type: 'chat',
				systemMessage: bot.systemMessage,
			},
		};
		delete updatedBot.type;

		await botCollection.replaceOne({ _id: bot._id }, updatedBot);
		console.log(`Migrated bot ${bot._id}: updated to the new Bot object.`);
	}
}


migrateToTypeConfig().catch((err) => {
	console.error('Error during migration:', err);
});