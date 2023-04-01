import React, {createContext, useContext, useEffect, useState} from 'react';
import {Bot} from '../../objects-api/bots';
import {BotClient} from '../../frontend/clients/botClient';
import {useUserContext} from './UserContext';

interface UserBotsContextType {
	bots: Bot[] | null;
	selectedBot: Bot | null;
	setSelectedBot: (bot: Bot | null) => void;
	botClient: BotClient | null;
	refreshBots: () => Promise<void>;
}

interface UserBotsProviderProps {
	children: React.ReactNode;
}


const UserBotsContext = createContext<UserBotsContextType>({
	bots: null,
	selectedBot: null,
	setSelectedBot: () => {},
	botClient: null,
	refreshBots: () => Promise.reject("Not initialized"),
});

export const UserBotsProvider: React.FC<UserBotsProviderProps> = ({ children }) => {
	const { userId } = useUserContext();
	const [bots, setBots] = useState<Bot[] | null>(null);
	const [selectedBot, setSelectedBot] = useState<Bot | null>(null);
	const [botClient, setBotClient] = useState<BotClient | null>(null);

	useEffect(() => {
		if (userId === null) {
			setBotClient(null);
			return;
		}

		const loadBots = async (userId: string) => {
			console.log("Loading bots in context", { userId });
			const client = new BotClient(userId);
			setBotClient(client);
			setBots(await client.fetchBots());
		};

		loadBots(userId);
	}, [userId]);


	const refreshBots = async () => {
		console.log("Loading bots in context", {userId, bots, selectedBot});
		if (botClient === null) {
			throw new Error("Bot client is null");
		}
		const fetchedBots = await botClient.fetchBots();
		setBots(fetchedBots);
	};



	return (
		<UserBotsContext.Provider value={{ bots, selectedBot, setSelectedBot, botClient, refreshBots }}>
			{children}
		</UserBotsContext.Provider>
	);
};

export const useUserBotsContext = () => {
	return useContext(UserBotsContext);
};
