import React, { useState } from 'react';
import { Bot } from "../../objects-api/bots";
import AddBotButton from "./AddBotButton";
import CreateOrUpdateBotModal from "./CreateOrUpdateBotModal";
import BotCardList from "./BotCardList";


const BotMain: React.FC = () => {
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
			<BotCardList onSelect={openConfigureBot} />
			<div className="mt-8 w-full flex justify-center">
				<AddBotButton onClick={() => setOpenPopup(true)} />
			</div>
			{isOpenPopup &&
			<CreateOrUpdateBotModal onClose={closeConfigureBot} bot={selectedBot} />}
		</div>
	);
};

export default BotMain;
