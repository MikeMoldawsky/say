export interface ChatBotRequest {
	messages: ChatBotMessage[]
}

export interface ChatBotMessage {
	role: 'system' | 'user' | 'assistant',
	content: string
}

export interface ChatBotResponse {
	message: string
}