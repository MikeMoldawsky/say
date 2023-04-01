import React, {createContext, useContext, useEffect, useState} from 'react';
import {Bot, CreateBotRequest, DeleteBotRequest, UpdateBotRequest} from '../../objects-api/bots';
import {createBot, deleteBot, updateBot} from '../../frontend/clients/botClient';
import {useUserContext} from './UserContext';
import {fetchUserBots} from "../../frontend/clients/userClient";

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
	setSelectedBot: (_bot: Bot | null) => {},
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
			console.log("Loading bots in context", { userId });
			setBots(await fetchUserBots(userId));
		};
		loadBots(userId);
	}, [userId]);

	const loadBots = async (userId: string) => {
		console.log("Loading bots in context", {userId, bots, selectedBot});
		const fetchedBots = await fetchUserBots(userId);
		setBots(fetchedBots);
	};

	const createBotRefresh = async (createReq: CreateBotRequest) => {
		console.log("Creating bot in context", {userId, bots, selectedBot});
		if (!userId) return;
		await createBot(userId, createReq);
		await loadBots(userId);
	};

	const updateBotRefresh = async (updateReq: UpdateBotRequest) => {
		console.log("Updating bots in context", {userId, bots, selectedBot});
		if (!userId) return;
		await updateBot(userId, updateReq);
		await loadBots(userId);
	};

	const deleteBotRefresh = async (deletedBotReq: DeleteBotRequest) => {
		console.log("Updating bots in context", {userId, bots, selectedBot});
		if (!userId) return;
		await deleteBot(userId, deletedBotReq);
		await loadBots(userId,);;
	};

	const setSelectBotWrapper = (bot: Bot | null) => {
		console.log("Setting bots with context", {userId, bots, selectedBot, newBot: bot});
		setSelectedBot(bot);
	}

	return (
		<UserBotsContext.Provider value={{ bots, selectedBot, setSelectedBot: setSelectBotWrapper, createBot: createBotRefresh, updateBot: updateBotRefresh, deleteBot: deleteBotRefresh }}>
			{children}
		</UserBotsContext.Provider>
	);
};

export const useUserBotsContext = () => {
	return useContext(UserBotsContext);
};
