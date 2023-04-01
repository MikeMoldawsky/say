import { NextApiRequest, NextApiResponse } from 'next';
import { getUser } from '../../../../backend/db/users';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
): Promise<void> {
	const {query: { userId }} = req;
	if (req.method === 'GET') {
		try {
			const user = await getUser(userId as string);
			if (user) {
				res.status(200).json(user);
			} else {
				res.status(404).json({ message: `User with ID ${userId} not found` });
			}
		} catch (error) {
			if (error instanceof Error) {
				res.status(500).json({ message: 'Error fetching user', error: error.message });
			} else {
				res.status(500).json({ message: 'Error fetching user', error: String(error) });
			}
		}
	} else {
		res.status(405).json({ message: 'Method not allowed' });
	}
}
