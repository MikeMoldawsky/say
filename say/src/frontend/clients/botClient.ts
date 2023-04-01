import axios from 'axios';
import {Bot, CreateBotRequest, DeleteBotRequest, UpdateBotRequest} from '../../objects-api/bots';

export async function updateBot(userId: string, request: UpdateBotRequest): Promise<void> {
	//TODO: add authentication
	try {
		console.log('Updating bot', {userId, request});
		await axios.put(`/api/bots/${request._id}`, request, {headers: {  'Content-Type': 'application/json', 'X-User-ID': userId}});
	} catch (error) {
		console.error('Error updating bot:', error);
		throw error;
	}
}

export async function createBot(userId: string, request: CreateBotRequest): Promise<void> {
	//TODO: add authentication
	try {
		console.log('Creating bot', {userId, request});
		await axios.post(`/api/bots`, request, {headers: {  'Content-Type': 'application/json', 'X-User-ID': userId}});
	} catch (error) {
		console.error('Error creating request:', error);
		throw error;
	}
}

export async function deleteBot(userId: string, request: DeleteBotRequest): Promise<void> {
	//TODO: add authentication
	try {
		console.log('Deleting bot', {userId, request});
		await axios.delete(`/api/bots/${request._id}`, {headers: {  'Content-Type': 'application/json', 'X-User-ID': userId}});
	} catch (error) {
		console.error('Error deleting bot:', error);
		throw error;
	}
}

export async function getBot(userId: string, botId: string): Promise<Bot | null> {
	//TODO: add authentication
	try {
		console.log('Get bot', {userId, botId});
		const response = await axios.get(`/api/bots/${botId}`, {headers: {  'Content-Type': 'application/json', 'X-User-ID': userId}});

		if (response.status === 200) {
			return response.data;
		} else if (response.status === 404) {
			console.error(`Bot with id ${botId} not found`);
			return null;
		} else {
			console.error(`Failed to get bot with id ${botId}: ${response.statusText}`);
			return null;
		}
	} catch (error) {
		if (error instanceof Error) {
			console.error(`Error getting bot with id ${botId}: ${error.message}`);
		} else {
			console.error(`Error getting bot with id ${botId}: ${String(error)}`);
		}
		return null;
	}
}
