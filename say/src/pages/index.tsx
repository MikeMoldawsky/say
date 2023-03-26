import React, { useState } from 'react';
import Header from '../components/Header';
import BotList from '../components/BotList';
import { Bot } from '../components/Bot';

const IndexPage: React.FC = () => {
    const [bots, setBots] = useState<Bot[]>([
        { id: 1, name: 'Party Time', behavior: 'happy, friendly', description: "I'm soooo happy you're here :) ", imageUrl: 'https://i.imgur.com/8Km9tLL.png', systemMessage: 'Your are the happiest assistant in the world. Make sure you add happy vibes to every answer.'},
        { id: 2, name: 'Working Time', behavior: 'sad, formal, proffesional', description: "You again? I'm tired...", imageUrl: 'https://i.imgur.com/8Km9tL2.png', systemMessage: 'Your are the saddest assistant in the world. Make sure you add bad vibes to every answer.' },
    ]);

    return (
        <div >
            <Header />
            <div className="pt-20 px-4">
                <BotList bots={bots} />
            </div>
        </div>
    );
};

export default IndexPage;
