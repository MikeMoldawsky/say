import React, { useState } from 'react';
import Header from '../components/Header';
import BotList from '../components/BotList';

const IndexPage: React.FC = () => {
    const [bots, setBots] = useState([
        { id: 1, name: 'Party Time', behavior: 'happy, friendly', description: "I'm soooo happy you're here :) ", imageUrl: 'https://i.imgur.com/8Km9tLL.png' },
        { id: 2, name: 'Working Time', behavior: 'sad, formal, proffesional', description: "You again? I'm tired...", imageUrl: 'https://i.imgur.com/8Km9tL2.png' },
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
