// ChatMessages.tsx
import React from 'react';
import ChatMessage, { SayMessage } from './ChatMessage';
import ChatInput from './ChatInput';

interface ChatMessagesProps {
	messages: SayMessage[];
	title: string;
	className?: string;
	onNewMessage: (text: string) => void;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, title, className, onNewMessage }) => {
	return (
		<div className={`flex flex-col h-screen overflow-auto ${className}`}>
			<h2 className="text-3xl font-semibold pl-5 py-5">{title}</h2>
			<div className="overflow-auto flex-grow">
				{messages.map((message, index) => (
					<ChatMessage key={index} message={message} />
				))}
			</div>
			<ChatInput onSubmit={onNewMessage} className="border-t border-gray-300" />
		</div>
	);
};

export default ChatMessages;
