import {SayMessage} from "../../components/chat/ChatMessage";
import {ChatGPTMessage} from "../../objects-api/chat";

export function toChatGPTMessages(messages: SayMessage[]): ChatGPTMessage[] {
	return messages.map((message: SayMessage) => ({
		role: message.role,
		content: message.content,
	}));
}

