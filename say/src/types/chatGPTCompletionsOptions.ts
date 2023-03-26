export interface ChatGPTCompletionsOptions {
	model: string,
	prompt: string;
	maxTokens?: number;
	temperature?: number;
	topP?: number;
}

export interface ChatGPTChatOptions {
	model: string,
	messages: [any];
	maxTokens?: number;
	temperature?: number;
	topP?: number;
}