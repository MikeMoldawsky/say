import { NextApiRequest, NextApiResponse } from 'next';
import { BotResult } from '@/objects-api/bots';
import { botManager } from '../../../../../backend/db/db';


export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	const { userId } = req.query;
	if (req.method === 'GET') {
		try {
			console.log('Getting user bots', req.body);
			const newBots: BotResult[] = await botManager.getUserBots(userId as string);
			res.status(200).json(newBots);
		} catch (error) {
			console.error('Error fetching bots:', error);
			res.status(500).json({ message: 'Failed to fetch bots' });
		}
	} else {
		res.status(405).json({ message: 'Method not allowed' });
	}
}
