import React, { useState } from 'react';
import  { SayMessage } from './ChatMessage';
import ChatMessages from './ChatMessages';
import BotInformation from '../bot/BotInformation';
import { Bot } from '../bot/BotCard';
import { convertChatWindowMessagesToChatGPTMessages } from "../../frontend/utils/messageConverter";
import { chatWithBackendAPI } from '../../frontend/clients/sayClient';
import { v4 as uuidv4 } from 'uuid';
import { ChatGPTMessage } from '../../frontend/utils/messageConverter';


interface ChatBotProps {
	bot: Bot;
}


const ChatWindow: React.FC<ChatBotProps> = ({bot}) => {
	const [messages, setMessages] = useState<SayMessage[]>([]);
	const systemMessages: SayMessage[] = [{ id: uuidv4(), role: 'system', content: bot.systemMessage, createdAt: new Date() }];

	const handleNewMessage = async (userContent: string) => {

		// Make sure to use the updated messages state for the chatGPTMessages
		const userSayMessage = { id: uuidv4(), role: 'user', content: userContent, createdAt: new Date() };

		// Add user message and system message to the messages state
		setMessages((prevMessages) => [
			...prevMessages,
			{ id: uuidv4(), role: 'user', content: userContent, createdAt: new Date() },
		]);

		try {
			const chatGPTMessages: ChatGPTMessage[] = convertChatWindowMessagesToChatGPTMessages([
				...systemMessages,
				...messages,
				userSayMessage
			]);
			const assistantMessage = await chatWithBackendAPI(chatGPTMessages);
			setMessages((prevMessages) => [
				...prevMessages,
				{ id: uuidv4(), role: 'assistant', content: assistantMessage, createdAt: new Date() },
			]);
		} catch (error) {
			console.error('Error getting ChatGPT response:', error);
		}
	};

	return (
		<div className="bg-gray-100 min-h-screen flex flex-col">
			<div className="flex-grow flex">
				<div className="w-1/3 h-screen bg-white p-4 rounded-lg shadow overflow-auto">
					<BotInformation bot={bot} />
				</div>
				<div className="w-2/3 h-screen bg-white rounded-lg shadow flex flex-col">
					<ChatMessages messages={messages} title="Your Wish Is My Command" onNewMessage={handleNewMessage} />
				</div>
			</div>
		</div>
	);
};

export default ChatWindow;

