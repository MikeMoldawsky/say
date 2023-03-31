export interface ChatGPTMessage {
	role: string,
	content: string
}

export interface ChatCompletionRequest {
	messages: ChatGPTMessage[]
}