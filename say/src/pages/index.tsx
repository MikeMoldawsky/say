import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import BotList from '../components/BotList';
import AddBotButton from '../components/AddBotButton';
import AddBotPopup from '../components/AddBotPopup';
import { Bot } from '../components/BotCard';
import {createOrUpdateBot, fetchBots, deleteBotById } from '../frontend/clients/sayClient';
import Loader from '../components/Loader';

const IndexPage: React.FC = () => {
    const [showAddBotPopup, setShowAddBotPopup] = useState(false);
    const [bots, setBots] = useState<Bot[]|null>(null);
    const [selectedBot, setSelectedBot] = useState<Bot|null>(null);

    useEffect(() => {
        console.log("Mike fetches bots")
        const loadBots = async () => {
            const bots = await fetchBots();
            setBots(bots);
        }
        loadBots();
    }, []);


    const toggleAddBotPopup = () => {
        setShowAddBotPopup(!showAddBotPopup);
    };

    const handleConfigure = (bot: Bot) => {
        setSelectedBot(bot);
        toggleAddBotPopup();
    };

    const handleClose = () => {
        setSelectedBot(null);
        toggleAddBotPopup();
    };

    const addOrUpdateBot = (newOrUpdatedBot: Bot) => {
        try {
            console.log('Adding bot:', newOrUpdatedBot);
            createOrUpdateBot(newOrUpdatedBot).then(() => fetchBots().then(bots=>setBots(bots)));
            toggleAddBotPopup();
        } catch (error) {
            console.error('Error adding bot:', error);
        }
    };

    const deleteBot = (deletedBot: Bot) => {
        try {
            console.log('Deleting bot:', deletedBot);
            if (!deletedBot.id){
                throw new Error("Bot id is not defined");
            }
            deleteBotById(deletedBot.id).then(() => fetchBots().then(bots=>setBots(bots)));
        } catch (error) {
            console.error('Error deleting bot:', error);
        }
    };


    return (
        <div>
            <Header />
            <div className="pt-20 px-4">
                {bots === null ? < Loader/> :


                <div>
                <BotList bots={bots} onConfigure={handleConfigure} onDelete={deleteBot}/>
                <div className="mt-8 w-full flex justify-center">
                    <AddBotButton onClick={toggleAddBotPopup} />
                </div>
                {showAddBotPopup && <AddBotPopup onClose={handleClose} onSave={addOrUpdateBot} bot={selectedBot}/>}
                </div>
                }
            </div>
        </div>
    );
};

export default IndexPage;
