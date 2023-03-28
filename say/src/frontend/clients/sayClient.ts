import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { ChatGPTMessage } from '../utils/messageConverter';
import { Bot } from '../../objects-api/bots';

export async function chatWithBackendAPI(messages: ChatGPTMessage[]): Promise<string> {
	try {
		const response = await axios.post('/api/chat', messages);
		const assistantMessage = response.data.message;
		return assistantMessage;
	} catch (error) {
		console.error('Error fetching ChatGPT response from backend API:', error);
		throw error;
	}
}

export async function fetchBots(userId: string): Promise<Bot[]> {
	try {
		const response = await fetch(`/api/users/${userId}/bots`);
		if (response.ok) {
			const data = await response.json();
			return data;
		}
		console.error('Error fetching bots:', response.statusText);
		return [];
	} catch (error) {
		console.error('Error fetching bots:', error);
		return [];
	}
}

export async function createOrUpdateBot(userId: string, bot: Bot): Promise<void> {
	try {
		if (!bot._id) {
			// new bot
			await axios.post('/api/bots', { ...bot, id: uuidv4() });
		} else {
			await axios.put('/api/bots', bot);
		}
	} catch (error) {
		console.error('Error creating or updating bot:', error);
		throw error;
	}
}

export async function deleteBotById(id: string): Promise<void> {
	try {
		await axios.delete('/api/bots', { data: { id } });
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
		console.error(`Error getting bot with id ${botId}: ${error.message}`);
		return null;
	}
}
