import React, { useState } from 'react';

interface ChatInputProps {
	onSubmit: (text: string) => void;
	className?: string;
}

const ChatInput: React.FC<ChatInputProps> = ({  onSubmit, className }) => {
	const [inputValue, setInputValue] = useState('');

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!inputValue) return;

		onSubmit(inputValue);
		setInputValue('');
	};

	return (
		<form onSubmit={handleSubmit} className={`flex items-center p-4  ${className}`}>
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
