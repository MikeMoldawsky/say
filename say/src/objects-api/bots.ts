export interface Bot {
	_id: string;
	name: string;
	imageUrl: string;
	description: string;
	systemMessage: string;
}

export interface CreateBotRequest {
	name: string;
	imageUrl: string;
	description: string;
	systemMessage: string;
}

export interface UpdateBotRequest {
	name?: string;
	imageUrl?: string;
	description?: string;
	systemMessage?: string;
}


export interface GetAnswerBotRequest {
	content: string;
}

export interface ChatBotRequest {
	messages: ChatBotMessage[]
}


export interface ChatBotResponse {
	message: string
}

export interface ChatBotMessage {
	role: 'system' | 'user' | 'assistant',
	content: string
}