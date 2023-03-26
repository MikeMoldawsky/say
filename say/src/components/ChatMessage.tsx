// ChatMessage.tsx
import React from 'react';

export interface Message {
	id: string;
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
			} flex items-start mb-4 mx-4 p-4 rounded-lg w-3/4 ${
				sender === 'user' ? 'self-end' : ''
			}`}
		>
			 <img
				 className="mr-4 h-10 w-10 rounded-full self-start"
				  src={sender === 'bot' ? "https://i.imgur.com/8Km9tLL.png": "https://i.imgur.com/83aoGyM.gif"}
				  alt="Avatar"
			 />
			<div className="flex flex-col break-words">
				<p>{text}</p>
				<span className="text-sm text-gray-600 mt-1">{formattedTimestamp}</span>
			</div>
		</div>
	);
};

export default ChatMessage;
