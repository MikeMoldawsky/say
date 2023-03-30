import React, { createContext, useContext, useEffect, useState } from 'react';
import { Bot, CreateBotRequest, UpdateBotRequest } from '../../objects-api/bots';
import { createBot, deleteBotById, fetchBots, updateBot } from '../../frontend/clients/sayClient';
import { useUserContext } from './UserContext';

interface UserBotsContextType {
	bots: Bot[] | null;
	createBot: (createReq: CreateBotRequest) => void;
	updateBot: (updateReq: UpdateBotRequest) => void;
	deleteBot: (deletedBot: Bot) => void;
}

const UserBotsContext = createContext<UserBotsContextType>({
	bots: null,
	createBot: () => {},
	updateBot: () => {},
	deleteBot: () => {},
});

export const UserBotsProvider: React.FC = ({ children }) => {
	const { userId } = useUserContext();
	const [bots, setBots] = useState<Bot[] | null>(null);

	useEffect(() => {
		if (userId === null) return;
		loadBots(userId);
	}, [userId]);

	const loadBots = async (userId: string) => {
		console.log("Loading bots for user: " + userId);
		const fetchedBots = await fetchBots(userId);
		setBots(fetchedBots);
	};

	const createBotRefresh = async (createReq: CreateBotRequest) => {
		if (!userId) return;
		await createBot(userId, createReq);
		await loadBots(userId);
	};

	const updateBotRefresh = async (updateReq: UpdateBotRequest) => {
		if (!userId) return;
		await updateBot(userId, updateReq);
		await loadBots(userId);
	};

	const deleteBot = async (deletedBot: Bot) => {
		if (!userId) return;
		await deleteBotById(userId, deletedBot._id);
		await loadBots(userId);;
	};

	return (
		<UserBotsContext.Provider value={{ bots, createBot: createBotRefresh, updateBot: updateBotRefresh, deleteBot }}>
			{children}
		</UserBotsContext.Provider>
	);
};

export const useUserBotsContext = () => {
	return useContext(UserBotsContext);
};
