import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import ChatWindow from '../components/chat/ChatWindow';
import { Bot } from '../components/bot/BotCard';
import { getBotById } from '../frontend/clients/sayClient';
import Loader from '../components/Loader';


const userId = '6422d27a79b10a5364ed8cd0';

const ChatPage: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const [selectedBot, setSelectedBot] = useState<Bot | null>(null);

    useEffect(() => {
        const loadBot = async () => {
            if (id) {
                const bot = await getBotById(userId, id as string);
                setSelectedBot(bot);
            }
        };

        loadBot();
    }, [id]);


    return (
        <div>
            <Header />
            <div className="pt-20 px-4">
                {!selectedBot ? < Loader/> : <ChatWindow bot={selectedBot} />}
            </div>
        </div>
    );
};

export default ChatPage;
