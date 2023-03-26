// ChatMessages.tsx
import React from 'react';
import ChatMessage, { Message } from './ChatMessage';

interface ChatMessagesProps {
	messages: Message[];
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
	return (
		<div>
			{messages.map((message, index) => (
				<ChatMessage key={index} message={message} />
			))}
		</div>
	);
};

export default ChatMessages;
