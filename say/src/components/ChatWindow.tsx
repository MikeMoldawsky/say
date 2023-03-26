import React, { useState } from 'react';
import  { SayMessage } from './ChatMessage';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import BotInformation from './BotInformation';
import { Bot } from './Bot';
import { convertChatWindowMessagesToChatGPTMessages } from "../utils/messageConverter";
import { chatWithBackendAPI } from '../clients/sayClient';
import { v4 as uuidv4 } from 'uuid';
import { ChatGPTMessage } from '../types/chatGPTOptions';


interface ChatBotProps {
	bot: Bot;
}

const systemMessage = 'Your are the happiest assistant in the world. Make sure you add happy vibe to every answer.';

const ChatWindow: React.FC<ChatBotProps> = ({bot}) => {
	const [messages, setMessages] = useState<SayMessage[]>([{ id: uuidv4(), role: 'system', content: systemMessage, createdAt: new Date() }]);

	const handleNewMessage = async (userContent: string) => {


		// Make sure to use the updated messages state for the chatGPTMessages
		const userSayMessage = { id: uuidv4(), role: 'user', content: userContent, createdAt: new Date() };
		const updatedMessages = [
			...messages,
			userSayMessage
		];

		// Add user message and system message to the messages state
		setMessages((prevMessages) => [
			...prevMessages,
			{ id: uuidv4(), role: 'user', content: userContent, createdAt: new Date() },
		]);


		try {
			const chatGPTMessages: ChatGPTMessage[] = convertChatWindowMessagesToChatGPTMessages(updatedMessages);
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
		<div className="bg-gray-100 min-h-screen">
			<h2 className="text-center text-3xl font-semibold pt-10 pb-5">Your Wish Is My Command</h2>
			<div className="flex max-w-5xl mx-auto">
				<div className="w-1/3 bg-white p-4 rounded-lg shadow">
					<BotInformation bot={bot} />
				</div>
				<div className="w-2/3 bg-white rounded-lg shadow">
					<ChatMessages messages={messages} />
					<ChatInput onSubmit={handleNewMessage} />
				</div>
			</div>
		</div>
	);
};

export default ChatWindow;

