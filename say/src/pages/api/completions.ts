// pages/api/completions.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getChatGPTCompletion } from '../../utils/chatGPT';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const prompt = req.body.prompt;
      const completion = await getChatGPTCompletion({ prompt, model: "text-davinci-003" });
      res.status(200).json({ completion });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching ChatGPT completion' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
