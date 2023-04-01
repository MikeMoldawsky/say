import { Configuration, OpenAIApi } from "openai";
import {ChatBotRequest, ChatBotMessage} from "../../objects-api/chat";
import {ChatCompletionRequestMessage} from "openai/api";

const chatGPT_API_KEY = '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'; // TODO: remove to env var

const configuration = new Configuration({
	organization: "org-E4HbdHV5iIPjN29fzh8sqVms",
	apiKey: chatGPT_API_KEY,
	// apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);


export class ChatGPTClient {

	async chat(request: ChatBotRequest): Promise<string> {
		function toChatCompletionMessage(message: ChatBotMessage): ChatCompletionRequestMessage {
			return {
				role: message.role,
				content: message.content,
			}
		}

		const messages: Array<ChatCompletionRequestMessage> = request.messages.map(toChatCompletionMessage);
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
}
