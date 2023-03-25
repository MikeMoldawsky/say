export interface ChatGPTOptions {
	model: string,
	prompt: string;
	maxTokens?: number;
	temperature?: number;
	topP?: number;
}