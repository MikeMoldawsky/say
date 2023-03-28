import axios from 'axios';
import { Bot } from '../../components/BotCard';
import { v4 as uuidv4 } from 'uuid';
import {ChatGPTMessage} from "../utils/messageConverter";

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

export async function fetchBots(): Promise<Bot[]> {
	const response = await fetch('/api/users/6422d27a79b10a5364ed8cd0/bots');
	const data = await response.json();
	return data;
};

export async function createOrUpdateBot(bot: Bot): Promise<void> {
	if (!bot.id) { // new bot
		await axios.post('/api/bots', {...bot, id: uuidv4()});
	}
	else {
		await axios.put('/api/bots', bot);
	}
};

export async function deleteBotById(id: string): Promise<void> {
	await axios.delete('/api/bots', {data: {id}});
};

export async function getBotById(botId: string): Promise<Bot | null> {
	try {
		const response = await axios.get(`/api/users/6422d27a79b10a5364ed8cd0/bots/${botId}`);

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
