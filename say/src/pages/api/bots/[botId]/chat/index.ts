import type { NextApiRequest, NextApiResponse } from 'next';
import { ChatGPTClient } from '../../../../../backend/chatGPT/chatGPTClient';
import {ChatBotRequest, ChatBotResponse } from "../../../../../objects-api/chat";


const chatGPT = new ChatGPTClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'POST':
        const request: ChatBotRequest = req.body;
        const assistantMessage = await chatGPT.chat(request);
        const response: ChatBotResponse = { message: assistantMessage };
        res.status(200).json(response);
        break;
      default:
        res.status(405).json({ error: 'Method Not Allowed' });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({message: 'Error at answer endpoint', error: error.message});
    } else {
      res.status(500).json({message: 'Error at answer endpoint', error: String(error)});
    }
  }
}
