export interface ChatGPTCompletionsOptions {
	model: string,
	prompt: string;
	maxTokens?: number;
	temperature?: number;
	topP?: number;
}

export interface ChatGPTMessage {
	id: string,
	role: string,
	content: string
}

export interface ChatGPTChatOptions {
	model: string,
	messages: ChatGPTMessage[];
	maxTokens?: number;
	temperature?: number;
	topP?: number;
}