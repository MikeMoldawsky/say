// ChatInput.tsx
import React, { useState } from 'react';
import { chatWithBackendAPI } from '../clients/sayClient';
import { Message } from './ChatMessage';

interface ChatInputProps {
	onNewMessage: (message: Message) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onNewMessage }) => {
	const [inputValue, setInputValue] = useState('');

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!inputValue) return;

		const userMessage: Message = {
			sender: 'user',
			text: inputValue,
			timestamp: new Date().toISOString(),
		};
		onNewMessage(userMessage);

		const botMessageText = await sendMessage(inputValue);
		const botMessage: Message = {
			sender: 'bot',
			text: botMessageText,
			timestamp: new Date().toISOString(),
		};
		onNewMessage(botMessage);

		setInputValue('');
	};

	return (
		<form onSubmit={handleSubmit} className="flex items-center p-4">
			<input
				type="text"
				value={inputValue}
				onChange={(event) => setInputValue(event.target.value)}
				placeholder="Type your message..."
				className="flex-grow mr-4 px-3 py-2 rounded border-2 border-gray-200 focus:outline-none focus:border-blue-400 min-h-[50px] max-h-[100px] resize-y overflow-auto"
			/>
			<button
				type="submit"
				className="bg-blue-500 text-white px-5 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
			>
				Send
			</button>
		</form>
	);
};

export default ChatInput;
