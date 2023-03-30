import React, { useState } from 'react';
import { Bot } from "../../objects-api/bots";
import AddBotButton from "./AddBotButton";
import ConfigureBotPopup from "./ConfigureBotPopup";
import BotList from "./BotList";
import { useUserBotsContext } from '../react-context/UserBotsContext';

interface BotMainProps {
	openChat: (bot: Bot) => void;
}

const BotMain: React.FC<BotMainProps> = ({ openChat }) => {
	const { createBot, updateBot } = useUserBotsContext();
	const [isOpenPopup, setOpenPopup] = useState(false);
	const [selectedBot, setSelectedBot] = useState<Bot | null>(null);

	const openConfigureBot = (bot: Bot) => {
		setSelectedBot(bot);
		setOpenPopup(true);
	};

	const closeConfigureBot = () => {
		setSelectedBot(null);
		setOpenPopup(false);
	};

	return (
		<div>
			<BotList onChat={openChat} onConfigure={openConfigureBot} />
			<div className="mt-8 w-full flex justify-center">
				<AddBotButton onClick={() => setOpenPopup(true)} />
			</div>
			{isOpenPopup &&
			<ConfigureBotPopup onClose={closeConfigureBot} createBot={createBot} updateBot={updateBot} bot={selectedBot} />}
		</div>
	);
};

export default BotMain;
