import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Header from '../components/Header';
import ChatWindow from '../components/ChatWindow';
import { Bot } from '../components/BotCard';

const bots: Bot[] = [
    {
        id: 1,
        name: 'Party Time',
        description: "I'm soooo happy you're here :) ",
        imageUrl: 'https://i.imgur.com/8Km9tLL.png',
        systemMessage:
            'Your are the happiest assistant in the world. Make sure you add happy vibes to every answer.',
    },
    {
        id: 2,
        name: 'Working Time',
        description: "You again? I'm tired...",
        imageUrl: 'https://i.imgur.com/8Km9tL2.png',
        systemMessage:
            'Your are the saddest assistant in the world. Make sure you add bad vibes to every answer.',
    },
];

const ChatPage: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const botId = parseInt(id as string, 10);

    const selectedBot = bots.find((bot) => bot.id === botId);

    if (!selectedBot) {
        return <div>Bot not found</div>;
    }

    return (
        <div>
            <Header />
            <div className="pt-20 px-4">
                <ChatWindow bot={selectedBot} />
            </div>
        </div>
    );
};

export default ChatPage;
