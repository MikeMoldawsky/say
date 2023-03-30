import React, { useState } from 'react';
import { Bot } from "../../objects-api/bots";
import AddBotButton from "./AddBotButton";
import CreateOrUpdateBotModal from "./CreateOrUpdateBotModal";
import BotCardList from "./BotCardList";


const BotMain: React.FC = () => {
	const [isOpenModal, setOpenModal] = useState(false);
	const [selectedBot, setSelectedBot] = useState<Bot | null>(null);

	const openConfigureBot = (bot: Bot) => {
		setSelectedBot(bot);
		setOpenModal(true);
	};

	const closeConfigureBot = () => {
		setSelectedBot(null);
		setOpenModal(false);
	};

	return (
		<div>
			<BotCardList onSelect={openConfigureBot} />
			<div className="mt-8 w-full flex justify-center">
				<AddBotButton onClick={() => setOpenModal(true)} />
			</div>
			{isOpenModal &&
			<CreateOrUpdateBotModal onClose={closeConfigureBot} bot={selectedBot} />}
		</div>
	);
};

export default BotMain;
