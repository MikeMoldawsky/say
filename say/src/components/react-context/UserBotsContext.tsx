import React, {createContext, useContext, useEffect, useState} from 'react';
import {Bot, CreateBotRequest, UpdateBotRequest} from '../../objects-api/bots';
import {createBot, deleteBot, updateBot, chatWithBot} from '../../frontend/clients/botClient';
import {useUserContext} from './UserContext';
import {fetchUserBots} from "../../frontend/clients/userClient";
import {ChatBotRequest} from "../../objects-api/chat";

interface UserBotsContextType {
	bots: Bot[] | null;
	selectedBot: Bot | null;
	setSelectedBot: (bot: Bot | null) => void;
	createBot: (createReq: CreateBotRequest) => void;
	updateSelectedBot: (updateReq: UpdateBotRequest) => void;
	deleteSelectedBot: (deletedBot: Bot) => void;
	chatWithSelectedBot: (_request: ChatBotRequest) => Promise<string>;
}

interface UserBotsProviderProps {
	children: React.ReactNode;
}


const UserBotsContext = createContext<UserBotsContextType>({
	bots: null,
	selectedBot: null,
	createBot: () => {},
	setSelectedBot: (_bot: Bot | null) => {},
	updateSelectedBot: () => {},
	deleteSelectedBot: () => {},
	chatWithSelectedBot: (_request: ChatBotRequest) => Promise.reject("No bot selected")
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

	const updateSelectedBot = async (updateReq: UpdateBotRequest) => {
		console.log("Updating bots in context", {userId, bots, selectedBot});
		if (!userId || !selectedBot) return;
		await updateBot(userId, selectedBot._id, updateReq);
		await loadBots(userId);
	};

	const deleteSelectedBot = async () => {
		console.log("Updating bots in context", {userId, bots, selectedBot});
		if (!userId || !selectedBot) return;
		await deleteBot(userId, selectedBot._id);
		await loadBots(userId);
	};

	const chatWithSelectedBot = async (request: ChatBotRequest) => {
		console.log("Chatting with selected bot in context", {userId, bots, selectedBot});
		if (!userId || !selectedBot) return;
		return await chatWithBot(selectedBot._id, request);
	}

	const setSelectBotWrapper = (bot: Bot | null) => {
		console.log("Setting bots with context", {userId, bots, selectedBot, newBot: bot});
		setSelectedBot(bot);
	}


	return (
		<UserBotsContext.Provider value={{ bots, selectedBot, setSelectedBot: setSelectBotWrapper, createBot: createBotRefresh, updateSelectedBot, deleteSelectedBot, chatWithSelectedBot }}>
			{children}
		</UserBotsContext.Provider>
	);
};

export const useUserBotsContext = () => {
	return useContext(UserBotsContext);
};
