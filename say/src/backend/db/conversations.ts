import { Collection } from 'mongodb';
import {connectToDatabase} from "./db";


export async function createConversation(userId: string, botId: string): Promise<void> {
	const db = await connectToDatabase();
	const conversationsCollection: Collection = db.collection('conversations');
	await conversationsCollection.insertOne({ userId, botId });
}


