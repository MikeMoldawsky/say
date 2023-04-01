import { NextApiRequest, NextApiResponse } from 'next';
import { getBots } from '../../../../../backend/db/bots';

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
	} else {
		res.status(405).json({ message: 'Method not allowed' });
	}
}
