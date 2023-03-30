import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import {createBot, updateBot, fetchBots, deleteBotById } from '../frontend/clients/sayClient';
import Loader from '../components/Loader';
import {useRouter} from "next/router";
import {Bot, CreateBotRequest, UpdateBotRequest} from "../objects-api/bots";
import BotMain from "../components/bot/BotMain";
import {useUserContext} from "../components/react-context/UserContext";



const IndexPage: React.FC = () => {
    const router = useRouter();
    const [bots, setBots] = useState<Bot[]|null>(null);
    const { userId } = useUserContext();

    useEffect(() => {
        if (userId === null) return;
        const loadBots = async () => {
            const bots = await fetchBots(userId);
            setBots(bots);
        }
        loadBots();
    }, [userId]);

    const openChat = (bot: Bot) => {
        router.push(`/chat?id=${bot._id}`);
    };


    const deleteBotRefresh = (deletedBot: Bot) => {
        try {
            if(userId){
                console.log('Deleting bot:', deletedBot);
                deleteBotById(userId, deletedBot._id).then(() => fetchBots(userId).then(bots=>setBots(bots)));
            }
        } catch (error) {
            console.error('Error deleting bot:', error);
        }
    };

    const createBotRefresh = (createReq: CreateBotRequest) => {
        try {
            if(userId){
                console.log('Creating bot:', createReq);
                createBot(userId, createReq).then(() => fetchBots(userId).then(bots=>setBots(bots)));
            }
        } catch (error) {
            console.error('Error creating bot:', error);
        }
    };

    const updateBotRefresh = (updateReq: UpdateBotRequest) => {
        try {
            if(userId){
                console.log('Updating bot:', updateReq);
                updateBot(userId, updateReq).then(() => fetchBots(userId).then(bots=>setBots(bots)));
            }
        } catch (error) {
            console.error('Error updating bot:', error);
        }
    };


    return (
        <div>
            <Header />
            <div className="pt-20 px-4">
                {
                    bots === null ?
                        < Loader/> :
                    <BotMain bots={bots} openChat={openChat} createBot={createBotRefresh} updateBot={updateBotRefresh} deleteBot={deleteBotRefresh}  />
                }
            </div>
        </div>
    );
};

export default IndexPage;

