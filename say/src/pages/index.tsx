import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import BotList from '../components/BotList';
import AddBotButton from '../components/AddBotButton';
import AddBotPopup from '../components/AddBotPopup';
import { Bot } from '../components/BotCard';

const IndexPage: React.FC = () => {
    const [bots, setBots] = useState<Bot[]>([]);
    const [showAddBotPopup, setShowAddBotPopup] = useState(false);

    useEffect(() => {
        const fetchBots = async () => {
            const response = await fetch('/api/bots');
            const data = await response.json();
            setBots(data);
        };

        fetchBots();
    }, []);


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
