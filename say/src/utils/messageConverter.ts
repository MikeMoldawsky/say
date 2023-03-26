import { Message } from "../components/ChatMessage";
import { ChatGPTMessage } from "../types/chatGPTOptions";

export function convertChatWindowMessagesToChatGPTMessages(messages: Message[]): ChatGPTMessage[] {
	return messages.map((message) => ({
		id: message.id,
		role: message.sender === "user" ? "user" : "assistant",
		content: message.text,
	}));
}