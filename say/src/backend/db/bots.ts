import { addUserBot, removeUserBot, getUser } from './users';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from './db';
import {Bot, CreateBotRequest, UpdateBotRequest} from "../../objects-api/bots";
import {fromBotDocument, toNewBotDocument} from "../converters/bot-conversion";


export async function getBot(botId: string): Promise<Bot | null> {
	const botsCollection = await getBotsCollection();
	const bot = await botsCollection.findOne({ _id: new ObjectId(botId) });
	return bot ? fromBotDocument(bot) : null;
}

export async function getBots(userId: string): Promise<Bot[]> {
	const user = await getUser(userId);
	if (!user) {
		throw new Error('User not found');
	}

	const botsCollection = await getBotsCollection();
	const bots = await botsCollection.find({ _id: { $in: user.botIds } }).toArray();
	return bots.map(bot => fromBotDocument(bot));
}

export async function addBot(userId: string, bot: CreateBotRequest): Promise<Bot> {
	const botsCollection = await getBotsCollection();
	const newBot = toNewBotDocument(bot);
	await botsCollection.insertOne(newBot);
	await addUserBot(userId, newBot._id);
	return fromBotDocument(newBot);
}

export async function addBots(userId: string, createBotRequests: CreateBotRequest[]): Promise<void> {
	const botsCollection = await getBotsCollection();
	const botDocuments = createBotRequests.map(toNewBotDocument);
	await botsCollection.insertMany(botDocuments);
	const botIds = botDocuments.map((bot) => bot._id);
	for (const botId of botIds) {
		await addUserBot(userId, botId);
	}
}

export async function updateBot(botData: UpdateBotRequest): Promise<void> {
	const botsCollection = await getBotsCollection();
	// Exclude _id field from botData when updating
	const { _id, ...updateData } = botData;
	await botsCollection.updateOne({ _id: new ObjectId(_id) }, { $set: updateData });
}

export async function deleteBot(userId: string, botId: string): Promise<void> {
	const botsCollection = await getBotsCollection();
	await botsCollection.deleteOne({ _id: new ObjectId(botId) });
	await removeUserBot(userId, botId);
}

async function getBotsCollection() {
	const db = await connectToDatabase();
	return db.collection('bots');
}

