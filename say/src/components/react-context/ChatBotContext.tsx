import {createContext, useContext, useEffect, useState} from 'react';
import {Bot} from '../../objects-api/bots';
import {getBotById} from "../../frontend/clients/sayClient";
import {useUserContext} from "./UserContext";

interface ChatBotContextType {
	bot: Bot | null;
	loadBot: (userId: string, botId: string) => void;
}

const ChatBotContext = createContext<ChatBotContextType>(	{
	bot: null,
	loadBot: (userId: string, botId: string) => {}
});

interface ChatBotProviderProps {
	botId: string;
}

export const ChatBotProvider: React.FC<ChatBotProviderProps> = ({ children, botId }) => {
	const {userId} = useUserContext();
	const [bot, setBot] = useState<Bot | null>(null);

	useEffect(() => {
		if (userId === null || botId === '') return;
		loadBot(userId, botId);
	}, [userId, botId]);

	const loadBot = async (userId, botId) => {
		const chatBot = await getBotById(userId, botId);
		console.log("Loaded bot: " + chatBot);
		setBot(chatBot);
	};

	return (
		<ChatBotContext.Provider value={{ bot, loadBot }}>
			{children}
		</ChatBotContext.Provider>
	);
};

export const useChatBotContext = (): ChatBotContextType => {
	return useContext(ChatBotContext);
};
