import fetch from 'node-fetch';
import {GenerateTextToImageRequest, GenerateTextToImageResponse} from "../../objects-api/generate-image";


const engineId = 'stable-diffusion-v1-5'
const stableDiffusion_API_KEY = 'sk-GgfxT6NnD2OYk5t1WuC0vJWTH3Ry7XDzVIfvMNrPFWFTfTZR'; // TODO: move to env var
const API_HOST = "https://api.stability.ai";
const headers = {
	'Content-Type': 'application/json',
	Accept: 'application/json',
	Authorization: `Bearer ${stableDiffusion_API_KEY}`,
}

interface StableDiffusionResponse {
	artifacts: Array<{
		base64: string;
	}>;
}

export async function generateTextToImage(params: GenerateTextToImageRequest): Promise<GenerateTextToImageResponse> {
	try {
		console.error("Making text-to-image request:", params)
		const response = await fetch(`${API_HOST}/v1/generation/stable-diffusion-512-v2-1/text-to-image`, {
			method: 'POST',
			headers,
			body: JSON.stringify({
				text_prompts: [params.prompt],
				width: params.width,
				height: params.height,
				samples: 1,
				cfg_scale: 13,
				steps: 25,
				sampler: 'K_DPMPP_2M',
			}),
		});
		if (!response.ok) {
			throw new Error(`Non-200 response: ${await response.text()}`);
		}

		const data = await response.json();
		const SDresponse = data as StableDiffusionResponse;
		return {
			imageBase64: SDresponse.artifacts[0].base64,
		};
	} catch (error) {
		console.error("Failed to make text-to-image request:", error);
		throw error;
	}
}
