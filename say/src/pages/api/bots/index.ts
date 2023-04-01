import { NextApiRequest, NextApiResponse } from 'next';
import { addBot, addBots } from '../../../backend/db/bots';
import {getUserIdFromHeader} from "../../../backend/utils/requests";

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	const userId = getUserIdFromHeader(req.headers);
	if(!userId){
		res.status(401).json({ message: 'Unauthorized' });
		return;
	}
	const createBotReq = req.body;
	if(!createBotReq){
		console.error("Bad request: createBotReq is undefined");
		res.status(500).json({ message: 'Bad request: createBotReq is undefined' });
		return;
	}
	if (req.method === 'POST') {
		try {
			console.log('req.body:', createBotReq);
			if (Array.isArray(createBotReq)) {
				// If the request body is an array of bots, call addBots
				await addBots(userId, createBotReq);
				res.status(201).json({ message: 'Bots added successfully' });
			} else {
				// If the request body is a single bot object, call addBot
				const newBot = await addBot(userId, createBotReq);
				res.status(201).json(newBot);
			}
		} catch (error) {
			console.error('Error creating a new bot:', error);
			res.status(500).json({ message: 'Failed to create a new bot' });
		}
	} else {
		res.status(405).json({ message: 'Method not allowed' });
	}
}
