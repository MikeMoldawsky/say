export interface User {
	_id: string;
	email: string;
}

export interface CreateUserRequest {
	email: string;
}
