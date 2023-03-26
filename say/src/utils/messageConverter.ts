import { SayMessage } from "../components/ChatMessage";
import { ChatGPTMessage } from "../types/chatGPTOptions";

export function convertChatWindowMessagesToChatGPTMessages(messages: SayMessage[]): ChatGPTMessage[] {
	return messages.map((message) => ({
		role: message.role,
		content: message.content,
	}));
}