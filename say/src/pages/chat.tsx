import { useRouter } from 'next/router';
import React from 'react';
import Header from '../components/Header';
import ChatWindow from '../components/chat/ChatWindow';
import {ChatBotProvider} from "../components/react-context/ChatBotContext";


const ChatPage: React.FC = () => {
    const router = useRouter();
    const { id: botId } = router.query;
    // TODO: add if botId is null, redirect to index page


    return (
        <div>
            <Header />
            <ChatBotProvider botId={botId}>
                <ChatWindow />
            </ChatBotProvider>
        </div>
    );
};

export default ChatPage;
