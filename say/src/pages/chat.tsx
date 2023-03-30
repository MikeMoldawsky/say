import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import ChatWindow from '../components/chat/ChatWindow';
import { getBotById } from '../frontend/clients/sayClient';
import Loader from '../components/Loader';
import {Bot} from "../objects-api/bots";
import {useUserContext} from "../components/react-context/UserContext";


const ChatPage: React.FC = () => {
    const router = useRouter();
    const {userId} = useUserContext()
    const { id: botId } = router.query;
    const [selectedBot, setSelectedBot] = useState<Bot | null>(null);

    useEffect(() => {
        if (userId === null) return;
        const loadBot = async () => {
            if (botId) {
                const bot = await getBotById(userId, botId as string);
                setSelectedBot(bot);
            }
        };
        loadBot();
    }, [userId, botId]);


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
