import React from 'react';
import Header from '../components/Header';
import ChatWindow from '../components/ChatWindow';

const bot = { id: 1, name: 'Party Time', behavior: 'happy, friendly', description: "I'm soooo happy you're here :) ", imageUrl: 'https://i.imgur.com/8Km9tLL.png' }

const ChatPage: React.FC = () => {
    return (
        <div>
            <Header />
            <div className="pt-20 px-4">
                <ChatWindow bot={bot}/>
            </div>
        </div>
    );
};

export default ChatPage;
