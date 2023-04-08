import {addUserBot, getUserDocument, removeUserBot} from './users';
import {ObjectId} from 'mongodb';
import {connectToDatabase} from './db';
import {BotResult, CreateBotRequest, UpdateBotRequest} from "../../objects-api/bots";
import {BotDocument, fromBotDocument, PartialBotDocument, toBotDocument, toPartialBotDocument} from "./schemas/bot";


export async function getBot(botId: string): Promise<BotResult> {
	const botsCollection = await getBotsCollection();
	const bot = await botsCollection.findOne({ _id: new ObjectId(botId) });
	if(!bot){
		throw new Error('Bot not found');
	}
	return fromBotDocument(bot);
}

export async function getBots(userId: string): Promise<BotResult[]> {
	const userDocument = await getUserDocument(userId);
	if (!userDocument) {
		throw new Error('User not found');
	}

	const botsCollection = await getBotsCollection();
	const bots = await botsCollection.find({ _id: { $in: userDocument.botIds } }).toArray();
	return bots.map(bot => fromBotDocument(bot));
}

export async function addBot(userId: string, bot: CreateBotRequest): Promise<BotResult> {
	const botsCollection = await getBotsCollection();
	const newBot: BotDocument = toBotDocument(bot);
	await botsCollection.insertOne(newBot);
	await addUserBot(userId, newBot._id);
	return fromBotDocument(newBot);
}

export async function addBots(userId: string, createBotRequests: CreateBotRequest[]): Promise<void> {
	const botsCollection = await getBotsCollection();
	const botDocuments: Array<BotDocument> = createBotRequests.map(toBotDocument);
	await botsCollection.insertMany(botDocuments);
	const botIds = botDocuments.map((bot) => bot._id);
	for (const botId of botIds) {
		await addUserBot(userId, botId);
	}
}

	export async function updateBot(botId: string, botUpdate: UpdateBotRequest): Promise<void> {
	const botsCollection = await getBotsCollection();
	const updatedBot: PartialBotDocument = toPartialBotDocument(botUpdate);
	await botsCollection.updateOne({ _id: new ObjectId(botId) }, { $set: updatedBot });
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

