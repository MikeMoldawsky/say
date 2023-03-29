import {SayMessage} from "../../components/chat/ChatMessage";

export interface ChatGPTMessage {
	role: string,
	content: string
}

export function toChatGPTMessages(messages: SayMessage[]): ChatGPTMessage[] {
	return messages.map((message: SayMessage) => ({
		role: message.role,
		content: message.content,
	}));
}

