import {SayMessage} from "../../components/ChatMessage";

export interface ChatGPTMessage {
	role: string,
	content: string
}

export function convertChatWindowMessagesToChatGPTMessages(messages: SayMessage[]): ChatGPTMessage[] {
	return messages.map((message: SayMessage) => ({
		role: message.role,
		content: message.content,
	}));
}

