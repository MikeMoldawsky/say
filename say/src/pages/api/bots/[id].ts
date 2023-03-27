import type { NextApiRequest, NextApiResponse } from 'next';
import { Bot } from '../../../components/BotCard';

async function getAllBots(): Promise<Bot[]> {
	const response = await fetch('/api/bots');
	const bots = await response.json();
	return bots;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Bot | { error: string }>) {
	const {
		query: { id },
	} = req;

	const allBots = await getAllBots();
	const botId = parseInt(id as string, 10);
	const selectedBot = allBots.find((bot) => bot.id === botId);

	if (!selectedBot) {
		res.status(404).json({ error: 'Bot not found' });
	} else {
		res.status(200).json(selectedBot);
	}
}
