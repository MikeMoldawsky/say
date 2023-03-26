// utils/chatGPT.ts
import { ChatGPTChatOptions, ChatGPTCompletionsOptions } from '../../../types/chatGPTOptions';
import axios from 'axios';

const chatGPT_API_KEY = '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'; // TODO: remove to env var
const chatGPT_COMPLETIONS_ENDPOINT = 'https://api.openai.com/v1/completions';
const chatGPT_CHAT_ENDPOINT = 'https://api.openai.com/v1/chat';


export class ChatGPTClient {

	async getChatGPTCompletion(options: ChatGPTCompletionsOptions): Promise<string> {
		const {model, prompt, maxTokens, temperature, topP} = options;

		const headers = {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${chatGPT_API_KEY}`,
		};

		const data = {
			model,
			prompt,
			max_tokens: maxTokens || 50,
			temperature: temperature || 0.7,
			top_p: topP || 1,
		};

		try {
			const response = await axios.post(chatGPT_COMPLETIONS_ENDPOINT, data, {headers});
			const completion = response.data.choices[0].text.trim();
			return completion;
		} catch (error) {
			console.error('Error fetching ChatGPT completion:', error);
			throw error;
		}
	}


	async chat(options: ChatGPTChatOptions): Promise<string> {
		const { model, messages, maxTokens, temperature, topP } = options;

		const headers = {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${chatGPT_API_KEY}`,
		};

		const data = {
			model,
			messages,
			options: {
				max_tokens: maxTokens || 50,
				temperature: temperature || 0.7,
				top_p: topP || 1,
			},
		};

		try {
			const response = await axios.post(chatGPT_CHAT_ENDPOINT, data, { headers });
			const assistantMessage = response.data.choices[0].message.text.trim();
			return assistantMessage;
		} catch (error) {
			console.error('Error fetching ChatGPT response:', error);
			throw error;
		}
	}
}
