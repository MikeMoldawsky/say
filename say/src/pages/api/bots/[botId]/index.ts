import { NextApiRequest, NextApiResponse } from 'next';
import {addBot, deleteBot, getBot, updateBot} from '../../../../backend/db/bots';
import {getUserIdFromHeader} from "../../../../backend/utils/requests";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
): Promise<void> {
	try {
		const userId = getUserIdFromHeader(req.headers);
		if (!userId) {
			res.status(401).json({message: 'Unauthorized'});
			return;
		}
		const {botId} = req.query;
		if(!botId) {
			res.status(400).json({message: 'Bad request'});
			return;
		}
		switch (req.method) {
			case 'GET':
				const bot = await getBot(botId as string);
				if (!bot) {
					res.status(404).json({message: `Bot with user ID ${userId} and bot ID ${botId} not found`});
					return;
				}
				res.status(200).json(bot);
				break;
			case 'POST':
				const createBotReq = req.body;
				const createdBot = await addBot(userId, createBotReq);
				res.status(201).json(createdBot);
				break;
			case 'PUT':
				const updateBotReq = req.body;
				await updateBot(botId as string, updateBotReq);
				res.status(200).json({message: 'Bot updated successfully'});
				break;
			case 'DELETE':
				await deleteBot(userId, botId as string);
				res.status(200).json({message: 'Bot deleted successfully'});
				break;
			default:
				res.status(405).json({message: 'Method not allowed'});
		}
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).json({message: 'Error at bot endpoint', error: error.message});
		} else {
			res.status(500).json({message: 'Error at bot endpoint', error: String(error)});
		}
	}
}
