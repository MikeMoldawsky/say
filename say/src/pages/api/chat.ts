import type { NextApiRequest, NextApiResponse } from 'next';
import { ChatGPT } from '../../utils/chatGPT';
import { ChatGPTChatOptions } from '../../types/chatGPTOptions';

const chatGPT = new ChatGPT();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const chatOptions: ChatGPTChatOptions = req.body;
      const assistantMessage = await chatGPT.chat(chatOptions);
      res.status(200).json({ assistantMessage });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching ChatGPT response' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
