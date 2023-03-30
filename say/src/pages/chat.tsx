import React from 'react';
import Header from '../components/Header';
import ChatWindow from '../components/chat/ChatWindow';
import {ChatBotProvider} from "../components/react-context/ChatBotContext";


const ChatPage: React.FC = () => {
    // TODO: add if botId is null, redirect to index page
    return (
        <div>
            <Header />
            <ChatBotProvider >
                <ChatWindow />
            </ChatBotProvider>
        </div>
    );
};

export default ChatPage;
