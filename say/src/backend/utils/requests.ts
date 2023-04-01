import {IncomingHttpHeaders} from "http";


export function getUserIdFromHeader(headers: IncomingHttpHeaders): string | null {
	const userId = headers['x-user-id'];
	if(!userId || Array.isArray(userId)){
		return null;
	}
	return userId;
}

