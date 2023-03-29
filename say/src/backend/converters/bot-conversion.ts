import { ObjectId } from 'mongodb';
import {Bot, CreateBotRequest} from '../../objects-api/bots';


export function toNewBotDocument(bot: CreateBotRequest): Omit<Bot, '_id'> & { _id: ObjectId } {
	return {
		...bot,
		_id: new ObjectId(),
	};
}

export function fromBotDocument(botDocument: any): Bot {
	return {
		...botDocument,
		_id: botDocument._id.toString(),
	};
}
