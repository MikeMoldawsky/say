import axios from 'axios';
import {
	Bot,
	ChatBotRequest,
	CreateBotRequest,
	GetAnswerBotRequest,
	UpdateBotRequest
} from '../../objects-api/bots';


export class BotClient {
	userId: string;

	constructor(userId: string) {
		this.userId = userId;
	}

	async updateBot(botId: string, request: UpdateBotRequest): Promise<void> {
		//TODO: add authentication
		try {
			console.log('Updating bot', {userId: this.userId, request});
			await axios.put(`/api/bots/${botId}`, request, {headers: {  'Content-Type': 'application/json', 'X-User-ID': this.userId}});
		} catch (error) {
			console.error('Error updating bot:', error);
			throw error;
		}
	}

	async createBot(request: CreateBotRequest): Promise<void> {
		//TODO: add authentication
		try {
			console.log('Creating bot', {request});
			await axios.post(`/api/bots`, request, {headers: {  'Content-Type': 'application/json', 'X-User-ID': this.userId}});
		} catch (error) {
			console.error('Error creating request:', error);
			throw error;
		}
	}

	async deleteBot(botId: string): Promise<void> {
		//TODO: add authentication
		try {
			console.log('Deleting bot', {userId: this.userId, botId});
			await axios.delete(`/api/bots/${botId}`, {headers: {  'Content-Type': 'application/json', 'X-User-ID': this.userId}});
		} catch (error) {
			console.error('Error deleting bot:', error);
			throw error;
		}
	}

	async  getBot(botId: string): Promise<Bot | null> {
		//TODO: add authentication
		try {
			console.log('Get bot', {userId: this.userId, botId});
			const response = await axios.get(`/api/bots/${botId}`, {headers: {  'Content-Type': 'application/json', 'X-User-ID': this.userId}});
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

	async fetchBots(): Promise<Bot[]> {
		//TODO: add authentication
		console.log("Fetching bots", {userId: this.userId});
		try {
			const response = await fetch(`/api/users/${this.userId}/bots`);
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

	async chatWithBot(botId: string, request: ChatBotRequest): Promise<string> {
		try {
			const response = await axios.post(`/api/bots/${botId}/chat`, request);
			return response.data.message;
		} catch (error) {
			console.error('Error chatting with bot', error);
			throw error;
		}
	}

	async answer(botId: string, request: GetAnswerBotRequest): Promise<string> {
		try {
			const response = await axios.post(`/api/bots/${botId}/answer`, request);
			return response.data.message;
		} catch (error) {
			console.error('Error chatting with bot', error);
			throw error;
		}
	}
}