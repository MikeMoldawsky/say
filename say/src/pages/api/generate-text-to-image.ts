import type { NextApiRequest, NextApiResponse } from 'next';
import {GenerateTextToImageRequest, GenerateTextToImageResponse} from "../../objects-api/generate-image";
import {generateTextToImage} from "../../backend/stable-diffusion/stableDiffusionClient";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const request: GenerateTextToImageRequest = req.body;
      const response: GenerateTextToImageResponse = await generateTextToImage(request);
      res.status(200).json(response);
    } catch (error: any) {
      console.error('Error generating image with stable diffusion response:', error);
      res.status(500).json({ error: 'Error generating image with stable diffusion response', details: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
