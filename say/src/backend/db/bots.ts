import { Bot } from '../../components/BotCard';
import { getUser, updateUser } from './users';
import {ObjectId} from "mongodb";

export async function getBot(userId: string, botId: string): Promise<Bot | null> {
	const user = await getUser(userId);
	if (!user) {
		throw new Error('User not found');
	}
	console.log(user.bots);
	const bot = user.bots.find(b => b._id.toString() === botId);
	return bot || null;
}

export async function getBots(userId: string): Promise<Bot[]> {
	const user = await getUser(userId);
	if (!user) {
		throw new Error('User not found');
	}
	return user.bots || [];
}


export async function addBot(userId: string, bot: Bot): Promise<Bot> {
	const user = await getUser(userId);
	if (!user) {
		throw new Error('User not found');
	}
	if(!user.bots){
		user.bots = [];
	}

	const newBot: Bot = { ...bot, _id: new ObjectId().toString() };
	user.bots.push(newBot);
	await updateUser(userId, user);
	return newBot;
}

export async function addBots(userId: string, bots: Bot[]): Promise<void> {
	const user = await getUser(userId);
	if (!user) {
		throw new Error('User not found');
	}
	if(!user.bots){
		user.bots = [];
	}
	// Generate MongoDB ObjectIDs for each bot
	const botsWithIds = bots.map((bot) => ({ ...bot, _id: new ObjectId() }));
	// Add the bots to the user's bots array
	user.bots.push(...botsWithIds);
	// Update the user document with the new bots
	await updateUser(userId, user);
}

export async function deleteBot(userId: string, botId: string): Promise<void> {
	const user = await getUser(userId);
	if (!user) {
		throw new Error('User not found');
	}

	// Filter out the bot with the specified botId
	user.bots = user.bots.filter((bot: Bot) => bot._id !== botId);

	// Update the user document with the remaining bots
	await updateUser(userId, user);
}


