import { ObjectId } from 'mongodb';
import {Bot, CreateBotRequest, UpdateBotRequest} from '../../objects-api/bots';

// Converts a Bot object to a bot document with an ObjectId
export function toBotDocument(bot: Bot ): Omit<Bot, '_id'> & { _id: ObjectId } {
	return {
		...bot,
		_id: new ObjectId(bot._id),
	};
}

export function toNewBotDocument(bot: CreateBotRequest): Omit<Bot, '_id'> & { _id: ObjectId } {
	return {
		...bot,
		_id: new ObjectId(),
	};
}

// Converts a bot document with an ObjectId to a Bot object
export function fromBotDocument(botDocument: any): Bot {
	return {
		...botDocument,
		_id: botDocument._id.toString(),
	};
}

// Converts a CreateBotRequest object to a bot document without the '_id' field
export function toBotUpdateDocument(bot: UpdateBotRequest): Omit<Bot, '_id'> {
	return {
		...bot,
	};
}