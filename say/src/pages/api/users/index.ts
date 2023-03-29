import { NextApiRequest, NextApiResponse } from 'next';
import { createUser } from '../../../backend/db/users';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
): Promise<void> {
	if (req.method === 'POST') {
		try {
			const userData = req.body;
			await createUser(userData);
			res.status(201).json({ message: 'User created successfully' });
		} catch (error) {
			if (error instanceof Error) {
				res.status(500).json({ message: 'Error creating user', error: error.message });
			} else {
				res.status(500).json({ message: 'Error creating user', error: String(error) });
			}
		}
	} else {
		res.status(405).json({ message: 'Method not allowed' });
	}
}
