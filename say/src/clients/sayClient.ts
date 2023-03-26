import { ChatGPTMessage } from '../types/chatGPTOptions';
import axios from 'axios';

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

