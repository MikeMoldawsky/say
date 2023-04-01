import { NextApiRequest, NextApiResponse } from 'next';
import {addBot, deleteBot, getBot, updateBot} from '../../../../backend/db/bots';
import {getUserIdFromHeader} from "../../../../backend/utils/requests";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
): Promise<void> {
	const userId = getUserIdFromHeader(req.headers);
	if(!userId){
		res.status(401).json({ message: 'Unauthorized' });
		return;
	}
	const { botId } = req.query;
	if (req.method === 'GET') {
		try {
			const bot = await getBot(botId as string);
			if (bot) {
				res.status(200).json(bot);
			} else {
				res.status(404).json({ message: `Bot with user ID ${userId} and bot ID ${botId} not found` });
			}
		} catch (error) {
			if (error instanceof Error) {
				res.status(500).json({ message: 'Error fetching bot', error: error.message });
			} else {
				res.status(500).json({ message: 'Error fetching bot', error: String(error) });
			}
		}
	} else if (req.method === 'POST') {
		try {
			const createBotReq = req.body;
			const createdBot = await addBot(userId, createBotReq);
			res.status(201).json(createdBot);
		} catch (error) {
			if (error instanceof Error) {
				res.status(500).json({ message: 'Error creating bot', error: error.message });
			} else {
				res.status(500).json({ message: 'Error creating bot', error: String(error) });
			}
		}
	}  else if (req.method === 'PUT') {
		try {
			const updateBotReq = req.body;
			await updateBot(updateBotReq);
			res.status(200).json({ message: 'Bot updated successfully' });
		} catch (error) {
			if (error instanceof Error) {
				res.status(500).json({ message: 'Error updating bot', error: error.message });
			} else {
				res.status(500).json({ message: 'Error updating bot', error: String(error) });
			}
		}
	} else if (req.method === 'DELETE') {
		try {
			await deleteBot(userId, botId as string);
			res.status(200).json({ message: 'Bot deleted successfully' });
		} catch (error) {
			if (error instanceof Error) {
				res.status(500).json({ message: 'Error deleting bot', error: error.message });
			} else {
				res.status(500).json({ message: 'Error deleting bot', error: String(error) });
			}
		}
	} else {
		res.status(405).json({ message: 'Method not allowed' });
	}
}
