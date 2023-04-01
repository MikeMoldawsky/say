import {ObjectId} from "mongodb";
import {CreateUserRequest, UpdateUserRequest, User} from "../../../objects-api/users";

export interface UserDocument {
	_id: ObjectId
	botIds: ObjectId[];
	email: string;
}

export type PartialUserDocument = Partial<Omit<UserDocument, '_id'>>;


export function toNewUserDocument(user: CreateUserRequest): UserDocument {
	return {
		_id: new ObjectId(),
		botIds: [],
		email: user.email,
	};
}

export function toUserDocument(userDocument: any): UserDocument {
	return {
		_id: userDocument._id,
		botIds: userDocument.botIds,
		email: userDocument.email,
	};
}

export function fromUserDocument(userDocument: any): User {
	return {
		_id: userDocument._id.toString(),
		email: userDocument.email,
	}
}

export function toPartialBotDocument(userUpdate: UpdateUserRequest): PartialUserDocument {
	return {...userUpdate};
}