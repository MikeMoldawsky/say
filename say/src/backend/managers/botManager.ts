import {Configuration, OpenAIApi} from "openai";
import {ChatCompletionRequestMessage} from "openai/api";
import {Bot, ChatBotRequest, GetAnswerBotRequest, isChatBotConfig, isImageBotConfig} from "../../objects-api/bots";
import {getBot} from "../db/bots";
import {generateTextToImage} from "../stable-diffusion/stableDiffusionManager";
import {GenerateTextToImageRequest} from "../../objects-api/generate-image";

const chatGPT_API_KEY = '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'; // TODO: remove to env var

const configuration = new Configuration({
	organization: "org-E4HbdHV5iIPjN29fzh8sqVms",
	apiKey: chatGPT_API_KEY,
	// apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);


export class BotManager {
	static toChatCompletionMessage(role: 'system' | 'user' | 'assistant', content: string): ChatCompletionRequestMessage {
		return {role, content}
	}

	static async chatCompletion(messages: Array<ChatCompletionRequestMessage>): Promise<string> {
		const completion = await openai.createChatCompletion({
			model: "gpt-3.5-turbo",
			messages,
		});
		console.log(completion.data.choices[0].message);
		if(!completion.data.choices[0].message){
			throw Error ("No message");
		}
		return completion.data.choices[0].message?.content;
	}

	async chat(botId: string, request: ChatBotRequest): Promise<string> {
		const bot: Bot = await getBot(botId);
		if(!isChatBotConfig(bot.config)) throw Error('Bot is not a chat bot');

		const systemMessage: ChatCompletionRequestMessage = BotManager.toChatCompletionMessage('system', bot.config.systemMessage);
		const messages: Array<ChatCompletionRequestMessage> = request.messages.map((msg) => BotManager.toChatCompletionMessage(msg.role, msg.content));
		return await BotManager.chatCompletion([systemMessage, ...messages]);
	}

	async answer(botId: string, request: GetAnswerBotRequest): Promise<string> {
		const bot: Bot = await getBot(botId);
		if(isChatBotConfig(bot.config)) {
			const systemMessage: ChatCompletionRequestMessage = BotManager.toChatCompletionMessage('system', bot.config["systemMessage"]);
			const userMessage: ChatCompletionRequestMessage = BotManager.toChatCompletionMessage('user', request.content);
			return await BotManager.chatCompletion([systemMessage, userMessage]);
		} else if (isImageBotConfig(bot.config)) {
			const req : GenerateTextToImageRequest = {
				prompt: {
					text: request.content,
				},
				height: 512,
				width: 512
			};
			return (await generateTextToImage(req)).imageBase64;
		}
		throw Error('Bot is not a chat bot');
	}
}
