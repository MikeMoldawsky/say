import {ChatGPTMessage} from "../utils/messageConverter";
import axios from "axios";

export async function chatWithChatGPT(messages: ChatGPTMessage[]): Promise<string> {
	try {
		const response = await axios.post('/api/chat', messages);
		return response.data.message;
	} catch (error) {
		console.error('Error fetching ChatGPT response from backend API:', error);
		throw error;
	}
}