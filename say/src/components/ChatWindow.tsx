import React, { useState } from 'react';
import ChatMessages from './ChatMessages';
import { Message } from './ChatMessage';
import ChatInput from './ChatInput';

const ChatWindow: React.FC = () => {
	const [messages, setMessages] = useState<Message[]>([]);

	const handleNewMessage = (message: Message) => {
		setMessages((prevMessages) => [...prevMessages, message]);
	};

	return (
		<div>
			<h2>Chat with Bot</h2>
			<ChatMessages messages={messages} />
			<ChatInput onNewMessage={handleNewMessage} />
		</div>
	);
};

export default ChatWindow;
