export interface Bot {
	_id: string;
	name: string;
	imageUrl: string;
	description: string;
	config: BotConfig;
}

export interface BotConfig {
	type: 'chat' | 'image';
}

export interface ChatBotConfig extends BotConfig {
	type: 'chat';
	systemMessage: string;
}

export interface ImageBotConfig extends BotConfig {
	type: 'image';
}

export interface CreateBotRequest {
	name: string;
	imageUrl: string;
	description: string;
	config: BotConfig
}

export type UpdateBotRequest = Partial<Omit<Bot, '_id'>>;


export interface GetAnswerBotRequest {
	content: string;
}

export interface ChatBotRequest {
	messages: ChatBotMessage[]
}

export interface ChatBotResponse {
	message: string
}


export function isChatBotConfig(config: BotConfig): config is ChatBotConfig {
	return config.type === 'chat';
}

export function isImageBotConfig(config: BotConfig): config is ImageBotConfig {
	return config.type === 'image';
}

export interface ChatBotMessage {
	role: 'system' | 'user' | 'assistant',
	content: string
}