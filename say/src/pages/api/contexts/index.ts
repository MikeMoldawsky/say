import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { Context } from '../../../components/Context';
import { nanoid } from 'nanoid';

const api = axios.create({
	baseURL: 'http://localhost:3001',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	const { query: { id } } = req;

	if (req.method === 'GET') {
		if (id) {
			const { data: context } = await api.get<Context>(`/contexts/${id}`);
			if (context) {
				res.status(200).json(context);
			} else {
				res.status(404).json({ message: `Context with id ${id} not found` });
			}
		} else {
			const { data: contexts } = await api.get<Context[]>('/contexts');
			res.status(200).json(contexts);
		}
	} else if (req.method === 'POST') {
		const newContext: Context = { ...req.body, id: nanoid() };
		const { data: createdContext } = await api.post<Context>('/contexts', newContext);
		res.status(201).json(createdContext);
	} else if (req.method === 'PUT') {
		const updatedContext: Context = req.body;
		await api.put(`/contexts/${updatedContext.id}`, updatedContext);
		res.status(200).json(updatedContext);
	} else if (req.method === 'DELETE') {
		const contextId = req.body.id;
		await api.delete(`/contexts/${contextId}`);
		res.status(200).json({ message: 'Context deleted' });
	} else {
		res.status(405).json({ message: 'Method not allowed' });
	}
}
