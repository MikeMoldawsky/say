import axios from "axios";
import {GenerateTextToImageRequest, GenerateTextToImageResponse} from "../../objects-api/generate-image";

export async function generateTextToImage(request: GenerateTextToImageRequest): Promise<GenerateTextToImageResponse> {
	try {
		const response = await axios.post('/api/generate-text-to-image', request);
		return response.data;
	} catch (error) {
		console.error('Error fetching Stable Diffusion response from backend API:', error);
		throw error;
	}
}