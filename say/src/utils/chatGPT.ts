// utils/chatGPT.ts
import axios from 'axios';
import {ChatGPTOptions} from "../types/chatGPTOptions";

const chatGPT_API_KEY = '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'; // TODO: remove to env var
const chatGPT_ENDPOINT = 'https://api.openai.com/v1/completions';

export async function getChatGPTCompletion(options: ChatGPTOptions): Promise<string> {
	const { model, prompt, maxTokens, temperature, topP } = options;

	const headers = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${chatGPT_API_KEY}`,
	};

	const data = {
		model: model || "text-davinci-003",
		prompt,
		max_tokens: maxTokens || 50,
		temperature: temperature || 0.7,
		top_p: topP || 1,
	};

	try {
		const response = await axios.post(chatGPT_ENDPOINT, data, { headers });
		const completion = response.data.choices[0].text.trim();
		return completion;
	} catch (error) {
		console.error('Error fetching ChatGPT completion:', error);
		throw error;
	}
}
