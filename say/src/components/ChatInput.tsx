// ChatInput.tsx
import React, { useState } from 'react';
import { sendMessage } from '../api/chat';
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
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				value={inputValue}
				onChange={(event) => setInputValue(event.target.value)}
				placeholder="Type your message..."
			/>
			<button type="submit">Send</button>
		</form>
	);
};

export default ChatInput;
