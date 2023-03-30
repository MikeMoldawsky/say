import React, {createContext, useContext, useEffect, useState} from 'react';
import {Bot, CreateBotRequest, UpdateBotRequest} from '../../objects-api/bots';
import {createBot, deleteBotById, fetchBots, updateBot} from '../../frontend/clients/sayClient';
import {useUserContext} from './UserContext';

interface UserBotsContextType {
	bots: Bot[] | null;
	selectedBot: Bot | null;
	setSelectedBot: (bot: Bot | null) => void;
	createBot: (createReq: CreateBotRequest) => void;
	updateBot: (updateReq: UpdateBotRequest) => void;
	deleteBot: (deletedBot: Bot) => void;
}

interface UserBotsProviderProps {
	children: React.ReactNode;
}


const UserBotsContext = createContext<UserBotsContextType>({
	bots: null,
	selectedBot: null,
	setSelectedBot: (bot: Bot | null) => {},
	createBot: () => {},
	updateBot: () => {},
	deleteBot: () => {},
});

export const UserBotsProvider: React.FC<UserBotsProviderProps> = ({ children }) => {
	const { userId } = useUserContext();
	const [bots, setBots] = useState<Bot[] | null>(null);
	const [selectedBot, setSelectedBot] = useState<Bot | null>(null);

	useEffect(() => {
		if (userId === null) return;
		const loadBots = async (userId: string) => {
			console.log("Loading bots with context", { userId });
			setBots(await fetchBots(userId));
		};
		loadBots(userId);
	}, [userId]);

	const loadBots = async (userId: string) => {
		console.log("Loading bots with context", {userId, bots, selectedBot});
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

	const setSelectBotWrapper = (bot: Bot | null) => {
		console.log("Setting bots with context", {userId, bots, selectedBot, newBot: bot});
		setSelectedBot(bot);
	}

	return (
		<UserBotsContext.Provider value={{ bots, selectedBot, setSelectedBot: setSelectBotWrapper, createBot: createBotRefresh, updateBot: updateBotRefresh, deleteBot }}>
			{children}
		</UserBotsContext.Provider>
	);
};

export const useUserBotsContext = () => {
	return useContext(UserBotsContext);
};
