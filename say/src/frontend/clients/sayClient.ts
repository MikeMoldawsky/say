import axios from 'axios';
import {ChatGPTMessage} from '../utils/messageConverter';
import {Bot, CreateBotRequest, UpdateBotRequest} from '../../objects-api/bots';

export async function chatWithBackendAPI(messages: ChatGPTMessage[]): Promise<string> {
	try {
		const response = await axios.post('/api/chat', messages);
		return response.data.message;
	} catch (error) {
		console.error('Error fetching ChatGPT response from backend API:', error);
		throw error;
	}
}

export async function fetchBots(userId: string): Promise<Bot[]> {
	console.log("Fetching bots", { userId });
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

export async function updateBot(userId: string, bot: UpdateBotRequest): Promise<void> {
	try {
		console.log('Updating bot');
		await axios.put(`/api/users/${userId}/bots/${bot._id}`, bot);
	} catch (error) {
		console.error('Error updating bot:', error);
		throw error;
	}
}

export async function createBot(userId: string, bot: CreateBotRequest): Promise<void> {
	try {
		console.log('Creating bot');
		await axios.post(`/api/users/${userId}/bots`, bot);
	} catch (error) {
		console.error('Error creating bot:', error);
		throw error;
	}
}

export async function deleteBotById(userId: string, botId: string): Promise<void> {
	try {
		await axios.delete(`/api/users/${userId}/bots/${botId}`);
	} catch (error) {
		console.error('Error deleting bot:', error);
		throw error;
	}
}

export async function getBotById(userId: string, botId: string): Promise<Bot | null> {
	try {
		const response = await axios.get(`/api/users/${userId}/bots/${botId}`);

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
