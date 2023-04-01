import type { NextApiRequest, NextApiResponse } from 'next';
import { BotManager } from '../../../../../backend/managers/botManager';
import {ChatBotResponse, GetAnswerBotRequest} from "../../../../../objects-api/bots";


const botManager = new BotManager();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {query: { botId }} = req;
  if(!botId){
    console.error("Bad request: botId is undefined");
    res.status(500).json({ message: 'Bad request: botId is undefined' });
    return;
  }
  try {
    switch (req.method) {
      case 'POST':
        const request: GetAnswerBotRequest = req.body;
        const assistantMessage = await botManager.answer(botId as string, request);
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
