import React, { useState } from 'react';
import { Bot } from "../../objects-api/bots";
import AddBotButton from "./AddBotButton";
import CreateOrUpdateBotModal from "./CreateOrUpdateBotModal";
import BotCardList from "./BotCardList";
import {useUserBotsContext} from "../react-context/UserBotsContext";


const BotMain: React.FC = () => {
	const [isOpenModal, setOpenModal] = useState(false);
	const {setSelectedBot} = useUserBotsContext();

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
			<BotCardList onConfigure={openConfigureBot} />
			<div className="mt-8 w-full flex justify-center">
				<AddBotButton onClick={() => setOpenModal(true)} />
			</div>
			{isOpenModal &&
			<CreateOrUpdateBotModal onClose={closeConfigureBot} />}
		</div>
	);
};

export default BotMain;
