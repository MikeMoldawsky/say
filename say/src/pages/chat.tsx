import React from 'react';
import Header from '../components/Header';
import ChatWindow from '../components/ChatWindow';

const ChatPage: React.FC = () => {
    return (
        <div>
            <Header />
            <ChatWindow />
        </div>
    );
};

export default ChatPage;
