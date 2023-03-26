import React, { useState } from 'react';
import  { Message } from './ChatMessage';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import BotInformation from './BotInformation';
import { Bot } from './Bot';

interface ChatBotProps {
	bot: Bot;
}


const ChatWindow: React.FC<ChatBotProps> = ({bot}) => {
	const [messages, setMessages] = useState<Message[]>([]);

	const handleNewMessage = (message: Message) => {
		setMessages((prevMessages) => [...prevMessages, message]);
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