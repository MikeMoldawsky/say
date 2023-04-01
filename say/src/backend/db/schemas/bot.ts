import {Bot, CreateBotRequest, UpdateBotRequest} from "../../../objects-api/bots";
import {ObjectId} from "mongodb";

export interface BotDocument {
	_id: ObjectId
	name: string;
	imageUrl: string;
	description: string;
	config: BotConfigDocument;
}

export interface BotConfigDocument {
	type: 'chat' | 'image';
}

export interface ChatBotConfigDocument extends BotConfigDocument {
	type: 'chat';
	systemMessage: string;
}

export interface ImageBotConfigDocument extends BotConfigDocument {
	type: 'image';
}

export type PartialBotDocument = Partial<Omit<BotDocument, '_id'>>;


export function toBotDocument(bot: CreateBotRequest): BotDocument {
	const config: BotConfigDocument = bot.type === 'chat'
		? {type: 'chat', systemMessage: bot.systemMessage} as ChatBotConfigDocument
		: {type: 'image'} as ImageBotConfigDocument;
	return {
		_id: new ObjectId(),
		name: bot.name,
		imageUrl: bot.imageUrl,
		description: bot.description,
		config
	};
}

export function fromBotDocument(botDocument: any): Bot {
	return {
		...botDocument,
		_id: botDocument._id.toString(),
	};
}

export function toPartialBotDocument(botUpdate: UpdateBotRequest): PartialBotDocument {
	return {...botUpdate};
}