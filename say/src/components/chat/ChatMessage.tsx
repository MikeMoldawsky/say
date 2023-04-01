// ChatMessage.tsx
import React from 'react';
import Image from 'next/image';

export interface SayMessage {
	id: string;
	createdAt: Date;
	role: 'system' | 'user' | 'assistant';
	content: string;
}

interface ChatMessageProps {
	message: SayMessage;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
	const { role, content, createdAt } = message;
	const formattedTimestamp = createdAt.toLocaleTimeString();

	return (
		<div
			className={`${
				role === 'user' ? 'bg-blue-200' : 'bg-green-200'
			} flex items-start mb-4 mx-4 p-4 rounded-lg w-3/4 ${
				role === 'user' ? 'self-end' : ''
			}`}
		>
			 <Image
				 className="mr-4 h-10 w-10 rounded-full self-start"
				  src={role === 'assistant' ? "https://i.imgur.com/8Km9tLL.png": "https://i.imgur.com/83aoGyM.gif"}
				  alt="Avatar"
				 width={40}
				 height={40}
		/>
			<div className="flex flex-col break-words">
				<p>{content}</p>
				<span className="text-sm text-gray-600 mt-1">{formattedTimestamp}</span>
			</div>
		</div>
	);
};

export default ChatMessage;
