import * as Generation from "./generation/generation_pb";
import {GenerationServiceClient} from "./generation/generation_pb_service";
import {grpc as GRPCWeb} from "@improbable-eng/grpc-web";
import {NodeHttpTransport} from "@improbable-eng/grpc-web-node-http-transport";
import {buildGenerationRequest, executeGenerationRequest, GenerationResponse} from "./helpers";
import {GenerateTextToImageRequest, GenerateTextToImageResponse} from "../../objects-api/generate-image";

// TODO: move to backend and to a env variable
const stableDiffusion_API_KEY = 'sk-GgfxT6NnD2OYk5t1WuC0vJWTH3Ry7XDzVIfvMNrPFWFTfTZR'; // TODO: move to env var

// This is a NodeJS-specific requirement - browsers implementations should omit this line.
GRPCWeb.setDefaultTransport(NodeHttpTransport());

// Authenticate using your API key, don't commit your key to a public repository!
export const metadata = new GRPCWeb.Metadata();
metadata.set("Authorization", "Bearer " + stableDiffusion_API_KEY);

// Create a generation client to use with all future requests
export const client = new GenerationServiceClient("https://grpc.stability.ai", {});


export async function generateTextToImage(params: GenerateTextToImageRequest): Promise<GenerateTextToImageResponse> {
	const generationRequest = buildGenerationRequest("stable-diffusion-512-v2-1", {
		type: "text-to-image",
		prompts: [params.prompt],
		width: params.width,
		height: params.height,
		samples: 1,
		cfgScale: 13,
		steps: 25,
		sampler: Generation.DiffusionSampler.SAMPLER_K_DPMPP_2M,
	});
	try {
		const generationResponse : GenerationResponse = await executeGenerationRequest(client, generationRequest, metadata);
		if (generationResponse instanceof Error) {
			console.error("Generation failed", generationResponse);
			throw generationResponse;
		}
		return {
			imageBase64: generationResponse.imageArtifacts[0].getBinary_asB64()
		};
	} catch (error) {
		console.error("Failed to make text-to-image request:", error);
		throw error;
	}
}
