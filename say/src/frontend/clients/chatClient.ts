import axios from "axios";
import {ChatCompletionRequest} from "../../objects-api/chat";

export async function chatWithChatGPT(request: ChatCompletionRequest): Promise<string> {
	try {
		const response = await axios.post('/api/chat', request);
		return response.data.message;
	} catch (error) {
		console.error('Error fetching ChatGPT response from backend API:', error);
		throw error;
	}
}