import { NextApiRequest, NextApiResponse } from 'next';
import { addBot, addBots, getBots } from '../../../../../backend/db/bots';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	const { userId } = req.query;

	if (req.method === 'GET') {
		try {
			const bots = await getBots(userId as string);
			res.status(200).json(bots);
		} catch (error) {
			console.error('Error fetching bots:', error);
			res.status(500).json({ message: 'Failed to fetch bots' });
		}
	} else if (req.method === 'POST') {
		try {
			const requestBody = req.body;
			console.log('req.body:', requestBody);

			if (Array.isArray(requestBody)) {
				// If the request body is an array of bots, call addBots
				await addBots(userId as string, requestBody);
				res.status(201).json({ message: 'Bots added successfully' });
			} else {
				// If the request body is a single bot object, call addBot
				const newBot = await addBot(userId as string, requestBody);
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
