import React from 'react';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

const ChatWindow = () => {
	return (
		<div>
			<h2>Chat with Bot</h2>
			<ChatMessages />
			<ChatInput />
		</div>
	);
};

export default ChatWindow;
