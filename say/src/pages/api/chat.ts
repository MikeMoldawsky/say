import type { NextApiRequest, NextApiResponse } from 'next';
import { ChatGPTClient } from '../../backend/chatGPT/chatGPTClient';
import {ChatCompletionRequest, ChatCompletionResponse} from "../../objects-api/chat";


const chatGPT = new ChatGPTClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      try {
        const request: ChatCompletionRequest = req.body;
        const assistantMessage = await chatGPT.chat(request);
        const response: ChatCompletionResponse = { message: assistantMessage };
        res.status(200).json(response);
      } catch (error: any) {
        console.error('Error fetching ChatGPT response:', error);
        res.status(500).json({ error: 'Error fetching ChatGPT response', details: error.message });
      }
      break;
    default:
      res.status(405).json({ error: 'Method Not Allowed' });
  }
}
