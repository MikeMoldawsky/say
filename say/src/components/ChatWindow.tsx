import React, { useState } from 'react';
import  { Message } from './ChatMessage';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

const ChatWindow: React.FC = () => {
	const [messages, setMessages] = useState<Message[]>([]);

	const handleNewMessage = (message: Message) => {
		setMessages((prevMessages) => [...prevMessages, message]);
	};

	return (
		<div className="bg-gray-100 min-h-screen">
			<h2 className="text-center text-3xl font-semibold pt-10 pb-5">Chat with Bot</h2>
			<div className="bg-white max-w-md mx-auto rounded-lg shadow">
				<ChatMessages messages={messages} />
				<ChatInput onNewMessage={handleNewMessage} />
			</div>
		</div>
	);
};

export default ChatWindow;