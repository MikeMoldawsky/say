// ChatMessage.tsx
import React from 'react';

export interface Message {
	sender: 'user' | 'bot';
	text: string;
	timestamp: string;
}

interface ChatMessageProps {
	message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
	const { sender, text, timestamp } = message;
	const formattedTimestamp = new Date(timestamp).toLocaleTimeString();

	return (
		<div
			className={`${
				sender === 'user' ? 'bg-blue-200' : 'bg-green-200'
			} flex items-start mb-4 mx-4 p-4 rounded-lg w-2/3 ${
				sender === 'user' ? 'self-end' : ''
			}`}
		>
			{sender === 'bot' ? <img src="https://i.imgur.com/8Km9tLL.png" alt="Bot Avatar" /> : <img src="https://i.imgur.com/83aoGyM.gif" alt="Bot Avatar" />}
			<div className="flex flex-col">
				<p>{text}</p>
				<span className="text-sm text-gray-600 mt-1">{formattedTimestamp}</span>
			</div>
		</div>
	);
};

export default ChatMessage;
