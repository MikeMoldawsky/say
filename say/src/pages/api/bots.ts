import { NextApiRequest, NextApiResponse } from 'next';
import { Chat } from '../../utils/chat';


const bots = {
   1:  { id: 1, name: 'Party Time', behavior: 'happy, friendly', description: "I'm soooo happy you're here :) ", imageUrl: 'https://i.imgur.com/8Km9tLL.png' },
   2: { id: 2, name: 'Working Time', behavior: 'sad, formal, proffesional', description: "You again? I'm tired...", imageUrl: 'https://i.imgur.com/8Km9tL2.png' }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // if (req.method === 'GET') {
  //   try {
  //     const { id } = req.body;
  //
  //     res.status(200).json({ message: bots[id]});
  //   } catch (error) {
  //     console.error('Error get bot:', error);
  //     res.status(500).json({ message: 'Error get bot' });
  //   }
  // } else {
  //   res.setHeader('Allow', 'GET');
  //   res.status(405).end('Method Not Allowed');
  // }
};

