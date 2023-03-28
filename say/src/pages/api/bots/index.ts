import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { Bot } from '../../../components/BotCard';
import { nanoid } from 'nanoid';

const api = axios.create({
	baseURL: 'http://localhost:3001',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	const { query: { id } } = req

	if (req.method === 'GET') {
		if (id) {
			const { data: bot } = await api.get<Bot>(`/bots/${id}`);
			if (bot) {
				res.status(200).json(bot);
			} else {
				res.status(404).json({ message: `Bot with id ${id} not found` });
			}
		} else {
			const { data: bots } = await api.get<Bot[]>('/bots');
			res.status(200).json(bots);
		}
	} else if (req.method === 'POST') {
		const newBot: Bot = { ...req.body, id: nanoid() };
		const { data: createdBot } = await api.post<Bot>('/bots', newBot);
		res.status(201).json(createdBot);
	} else if (req.method === 'PUT') {
		const updatedBot: Bot = req.body;
		await api.put(`/bots/${updatedBot.id}`, updatedBot);
		res.status(200).json(updatedBot);
	} else if (req.method === 'DELETE') {
		const botId = req.body.id;
		await api.delete(`/bots/${botId}`);
		res.status(200).json({ message: 'Bot deleted' });
	} else {
		res.status(405).json({ message: 'Method not allowed' });
	}
}
