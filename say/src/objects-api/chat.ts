export interface ChatGPTMessage {
	role: 'system' | 'user' | 'assistant',
	content: string
}

export interface ChatCompletionRequest {
	messages: ChatGPTMessage[]
}

export interface ChatCompletionResponse {
	message: string
}