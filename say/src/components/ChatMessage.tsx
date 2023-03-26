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

	return (
		<div className={`chat-message ${sender}`}>
			{sender === 'bot' ? <img src="https://i.imgur.com/8Km9tLL.png" alt="Bot Avatar" /> : <img src="https://i.imgur.com/83aoGyM.gif" alt="Bot Avatar" />}
			<div className="message-content">
				<p>{text}</p>
				<span className="timestamp">{timestamp}</span>
			</div>
		</div>
	);
};

export default ChatMessage;
