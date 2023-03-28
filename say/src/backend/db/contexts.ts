import { Collection } from 'mongodb';
import {connectToDatabase} from "./db";


export async function createContext(botId: string, contextData: { name: string; description: string }): Promise<void> {
	const db = await connectToDatabase();
	const contextsCollection: Collection = db.collection('contexts');
	await contextsCollection.insertOne({ ...contextData, botId });
}


