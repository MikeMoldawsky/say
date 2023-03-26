import axios from 'axios';

export async function sendMessage(message: string): Promise<string> {
	try {
		const response = await axios.post('/api/chat', { message });
		return response.data.message;
	} catch (error) {
		console.error('Error sending message:', error);
		throw error;
	}
}