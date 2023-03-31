export type GenerateTextToImageRequest = {
	prompt: GenerateImagePrompt;
	height: number;
	width: number;
};

export type GenerateTextToImageResponse = {
	imageBase64: string;
};

export type GenerateImageToImageRequest =  {
	type: "image-to-image";
	prompt: GenerateImagePrompt;
	initImage: Buffer;
};

export type GenerateImagePrompt = {
	/** The text prompt, maximum of 2000 characters. */
	text: string;
	/** The weight of the prompt, use negative values for negative prompts. */
	weight?: number;
};