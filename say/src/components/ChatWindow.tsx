import React from 'react';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

const ChatWindow:  React.FC = () => {
	return (
		<div>
			<h2>Chat with Bot</h2>
			<ChatMessages />
			<ChatInput onSubmit={() => alert("kuku!")} />
		</div>
	);
};

export default ChatWindow;
