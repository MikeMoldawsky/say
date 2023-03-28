import { NextApiRequest, NextApiResponse } from 'next';
import { deleteBot, getBot } from '../../../../../../backend/db/bots';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
): Promise<void> {
	const { userId, botId } = req.query;

	if (req.method === 'GET') {
		try {
			const bot = await getBot(botId as string);
			if (bot) {
				res.status(200).json(bot);
			} else {
				res.status(404).json({ message: `Bot with user ID ${userId} and bot ID ${botId} not found` });
			}
		} catch (error) {
			res.status(500).json({ message: 'Error fetching bot', error: error.message });
		}
	} else if (req.method === 'DELETE') {
		try {
			await deleteBot(userId as string, botId as string);
			res.status(200).json({ message: 'Bot deleted successfully' });
		} catch (error) {
			res.status(500).json({ message: 'Error deleting bot', error: error.message });
		}
	} else {
		res.status(405).json({ message: 'Method not allowed' });
	}
}
