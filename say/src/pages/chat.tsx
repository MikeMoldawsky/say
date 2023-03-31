import React from 'react';
import Header from '../components/Header';
import ChatWindow from '../components/chat/ChatWindow';


const ChatPage: React.FC = () => {
    // TODO: add if botId is null, redirect to index page
    return (
        <div>
            <ChatWindow />
        </div>
    );
};

export default ChatPage;
