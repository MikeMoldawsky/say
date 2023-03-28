import {Collection, ObjectId} from 'mongodb';
import { connectToDatabase } from './db';

export async function createUser(userData: { email: string }): Promise<void> {
	const db = await connectToDatabase();
	const usersCollection: Collection = db.collection('users');
	await usersCollection.insertOne(userData);
}

export async function getUser(userId: string): Promise<any> {
	const db = await connectToDatabase();
	const usersCollection: Collection = db.collection('users');
	const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
	return user;
}

export async function updateUser(userId: string, userData: any): Promise<void> {
	const db = await connectToDatabase();
	const usersCollection: Collection = db.collection('users');
	await usersCollection.updateOne({ _id: new ObjectId(userId) }, { $set: userData });
}
