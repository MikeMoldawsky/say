import { NextApiRequest, NextApiResponse } from 'next';
import { Chat } from '../../utils/chat';

const chat = new Chat();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { message } = req.body;
      const responseMessage = await chat.sendMessage(message);
      res.status(200).json({ message: responseMessage });
    } catch (error) {
      console.error('Error processing chat message:', error);
      res.status(500).json({ message: 'Error processing chat message' });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};

