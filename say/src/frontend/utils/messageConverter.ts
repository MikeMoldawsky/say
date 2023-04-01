import {SayMessage} from "../../components/chat/ChatMessage";
import {ChatBotRequest} from "../../objects-api/bots";

export function toChatCompletionRequest(satMessages: SayMessage[]): ChatBotRequest {
	const messages = satMessages.map((message: SayMessage) => ({
		role: message.role,
		content: message.content,
	}));
	return { messages };
}

