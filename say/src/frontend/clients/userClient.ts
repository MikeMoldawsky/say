import {CreateUserRequest, User} from "../../objects-api/users";
import axios from "axios";


export async function createUser(request: CreateUserRequest): Promise<User | null> {
	//TODO: add authentication
	console.log("Creating user", {request});
	try {
		const response = await axios.post('/api/user', request);
		return response.data.message;
	} catch (error) {
		console.error('Error creating user:', error);
		return null;
	}
}
