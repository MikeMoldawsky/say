// ChatMessages.tsx
import React from 'react';
import ChatMessage, { SayMessage } from './ChatMessage';

interface ChatMessagesProps {
	messages: SayMessage[];
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
	return (
		<div className="overflow-auto h-96">
			{messages.map((message, index) => (
				<ChatMessage key={index} message={message} />
			))}
		</div>
	);
};

export default ChatMessages;
