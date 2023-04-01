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

export interface DeleteBotRequest {
}

export interface AnswerBotRequest {
}
