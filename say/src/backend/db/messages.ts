import { Collection } from 'mongodb';
import {connectToDatabase} from "./db";


export async function createMessage(conversationId: string, messageData: { sender: string; content: string }): Promise<void> {
	const db = await connectToDatabase();
	const messagesCollection: Collection = db.collection('messages');
	await messagesCollection.insertOne({ ...messageData, conversationId });
}


