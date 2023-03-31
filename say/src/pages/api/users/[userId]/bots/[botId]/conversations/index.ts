import type { NextApiRequest, NextApiResponse } from 'next';
import { ChatGPTClient } from '../../../../../../../backend/chatGPT/chatGPTClient';
import {ChatGPTMessage} from "../../../../../../../objects-api/chat";


const chatGPT = new ChatGPTClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		try {
			const messages: ChatGPTMessage[] = req.body;
			const assistantMessage = await chatGPT.createChatCompletionOfficial(messages);
			res.status(200).json({ message: assistantMessage });
		} catch (error: any) {
			console.error('Error fetching ChatGPT response:', error);
			res.status(500).json({ error: 'Error fetching ChatGPT response', details: error.message });
		}
	} else {
		res.status(405).json({ error: 'Method Not Allowed' });
	}
}
