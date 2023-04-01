import {Collection, ObjectId} from 'mongodb';
import {connectToDatabase} from './db';
import {CreateUserRequest} from "../../objects-api/users";

export async function createUser(req: CreateUserRequest): Promise<void> {
	const usersCollection = await getUserCollection();
	await usersCollection.insertOne({email: req.email});
}

export async function getUser(userId: string): Promise<any> {
	const usersCollection = await getUserCollection();
	return await usersCollection.findOne({_id: new ObjectId(userId)});
}

export async function updateUser(userId: string, userData: any): Promise<void> {
	const usersCollection = await getUserCollection();
	await usersCollection.updateOne({ _id: new ObjectId(userId) }, { $set: userData });
}

export async function addUserBot(userId: string, botId: ObjectId): Promise<void> {
	const usersCollection = await getUserCollection();
	await usersCollection.updateOne({ _id: new ObjectId(userId) }, { $push: { botIds: botId } });
}

export async function removeUserBot(userId: string, botId: string): Promise<void> {
	const usersCollection = await getUserCollection();
	await usersCollection.updateOne({ _id: new ObjectId(userId) }, { $pull: { botIds: new ObjectId(botId) } });
}

async function getUserCollection() : Promise<Collection> {
	const db = await connectToDatabase();
	return db.collection('users');
}