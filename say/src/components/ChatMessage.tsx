import React from 'react';

interface ChatMessageProps {
	message: {
		sender: 'user' | 'bot';
		text: string;
		timestamp: string;
	};
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
	const { sender, text, timestamp } = message;

	return (
		<div className={`chat-message ${sender}`}>
			{sender === 'bot' && <img src="/bot-avatar.png" alt="Bot Avatar" />}
			<div className="message-content">
				<p>{text}</p>
				<span className="timestamp">{timestamp}</span>
			</div>
		</div>
	);
};

export default ChatMessage;
