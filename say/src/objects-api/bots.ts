export interface BotResult {
	_id: string;
	name: string;
	imageUrl: string;
	description: string;
	config: BotConfigRequest;
}

export interface BotConfigRequest {
	type: 'chat' | 'image';
}

export interface ChatBotConfig extends BotConfigRequest {
	type: 'chat';
	systemMessage: string;
}

export interface ImageBotConfig extends BotConfigRequest {
	type: 'image';
}

export interface CreateBotRequest {
	name: string;
	imageUrl: string;
	description: string;
	config: BotConfigRequest
}

export type UpdateBotRequest = Partial<Omit<BotResult, '_id'>>;


export interface GetAnswerBotRequest {
	content: string;
}

export interface ChatBotRequest {
	messages: ChatBotMessage[]
}

export interface ChatBotResponse {
	message: string
}


export function isChatBotConfig(config: BotConfigRequest): config is ChatBotConfig {
	return config.type === 'chat';
}

export function isImageBotConfig(config: BotConfigRequest): config is ImageBotConfig {
	return config.type === 'image';
}

export interface ChatBotMessage {
	role: 'system' | 'user' | 'assistant',
	content: string
}