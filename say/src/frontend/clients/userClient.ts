import {Bot} from '../../objects-api/bots';
import {CreateUserRequest, User} from "../../objects-api/users";
import axios from "axios";


export async function fetchUserBots(userId: string): Promise<Bot[]> {
	//TODO: add authentication
	console.log("Fetching bots", {userId});
	try {
		const response = await fetch(`/api/users/${userId}/bots`);
		if (response.ok) {
			return await response.json();
		}
		console.error('Error fetching bots:', response.statusText);
		return [];
	} catch (error) {
		console.error('Error fetching bots:', error);
		return [];
	}
}

export async function createUser(request: CreateUserRequest): Promise<User | null> {
	//TODO: add authentication
	console.log("Creating user", {request});
	try {
		const response = await axios.post('/api/bot', request);
		return response.data.message;
	} catch (error) {
		console.error('Error creating user:', error);
		return null;
	}
}
