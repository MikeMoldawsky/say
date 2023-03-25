import React from 'react';
import Header from '../components/Header';
import ChatWindow from '../components/ChatWindow';

const ChatPage: React.FC = () => {
    return (
        <div>
            <Header />
            <div className="pt-20 px-4">
                <ChatWindow />
            </div>
        </div>
    );
};

export default ChatPage;
