import { PrismaClient } from '@prisma/client';
import { MongoClient, Db } from 'mongodb';
import { UserRepository } from './repositories/users/UserRepository';
import { BotRepository } from './repositories/bots/BotRepository';
import { BotConfigurationRepository } from './repositories/configurations/BotConfigurationRepository';
import { UserManager } from './managers/UserManager';
import { BotManager } from './managers/BotManager';

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

const prisma = new PrismaClient();
const userRepository = new UserRepository(prisma);
const botRepository = new BotRepository(prisma);
const botConfigurationRepository = new BotConfigurationRepository(prisma);
const userManager = new UserManager(userRepository);
const botManager = new BotManager(botRepository, botConfigurationRepository);

export { prisma, userManager, botManager };