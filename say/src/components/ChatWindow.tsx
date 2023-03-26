import React, { useState } from 'react';
import  { Message } from './ChatMessage';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import BotInformation from './BotInformation';
import { Bot } from './Bot';
import { ChatGPTChatOptions } from '../types/chatGPTOptions';
import { convertChatWindowMessagesToChatGPTMessages } from "../utils/messageConverter";
import { chatWithBackendAPI } from '@/clients/chatClient';


interface ChatBotProps {
	bot: Bot;
}


const ChatWindow: React.FC<ChatBotProps> = ({bot}) => {
	const [messages, setMessages] = useState<Message[]>([]);

	const handleNewMessage = async (userMessage: string) => {
		const systemMessage = 'Your assistant is a helpful bot that can answer your questions.';
		const chatGPTMessages = convertChatWindowMessagesToChatGPTMessages(messages);

		const chatOptions: ChatGPTChatOptions = {
			model: 'gpt-3.5-turbo',
			messages: [
				{ id: uuidv4(), role: 'system', content: systemMessage },
				...chatGPTMessages,
				{ id: uuidv4(), role: 'user', content: userMessage },
			],
		};

		try {
			const assistantMessage = await chatWithBackendAPI(chatOptions);
			setMessages((prevMessages) => [
				...prevMessages,
				{ id: uuidv4(), role: 'user', content: userMessage, createdAt: new Date() },
				{ id: uuidv4(), role: 'assistant', content: assistantMessage, createdAt: new Date() },
			]);
		} catch (error) {
			console.error('Error getting ChatGPT response:', error);
		}
	};

	return (
		<div className="bg-gray-100 min-h-screen">
			<h2 className="text-center text-3xl font-semibold pt-10 pb-5">Your Wish Is My Command</h2>
			<div className="flex max-w-5xl mx-auto">
				<div className="w-1/3 bg-white p-4 rounded-lg shadow">
					<BotInformation bot={bot} />
				</div>
				<div className="w-2/3 bg-white rounded-lg shadow">
					<ChatMessages messages={messages} />
					<ChatInput onNewMessage={handleNewMessage} />
				</div>
			</div>
		</div>
	);
};

export default ChatWindow;

