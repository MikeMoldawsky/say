import React, { useState } from 'react';
import Header from '../components/Header';
import BotList from '../components/BotList';
import AddBotButton from '../components/AddBotButton';
import AddBotPopup from '../components/AddBotPopup';
import { Bot } from '../components/BotCard';

const IndexPage: React.FC = () => {
    const [bots, setBots] = useState<Bot[]>([
        { id: 1, name: 'Party Time', description: "I'm soooo happy you're here :) ", imageUrl: 'https://i.imgur.com/8Km9tLL.png', systemMessage: 'Your are the happiest assistant in the world. Make sure you add happy vibes to every answer.'},
        { id: 2, name: 'Working Time', description: "You again? I'm tired...", imageUrl: 'https://i.imgur.com/8Km9tL2.png', systemMessage: 'Your are the saddest assistant in the world. Make sure you add bad vibes to every answer.' },
    ]);

    const [showAddBotPopup, setShowAddBotPopup] = useState(false);

    const toggleAddBotPopup = () => {
        setShowAddBotPopup(!showAddBotPopup);
    };

    const addBot = (newBot: Bot) => {
        setBots([...bots, newBot]);
        toggleAddBotPopup();
    };

    return (
        <div>
            <Header />
            <div className="pt-20 px-4">
                <BotList bots={bots} />
                <div className="mt-8 w-full flex justify-center">
                    <AddBotButton onClick={toggleAddBotPopup} />
                </div>
                {showAddBotPopup && <AddBotPopup onClose={toggleAddBotPopup} onSave={addBot} />}
            </div>
        </div>
    );
};

export default IndexPage;
