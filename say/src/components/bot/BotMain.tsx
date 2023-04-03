import React, { useState } from 'react';
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {Bot, CreateBotRequest, UpdateBotRequest} from "../../objects-api/bots";
import Button from "../Button";
import CreateOrUpdateBotModal from "./CreateOrUpdateBotModal";
import BotCardList from "./BotCardList";
import {useUserBotsContext} from "../react-context/UserBotsContext";
import Loader from "../Loader";


const BotMain: React.FC = () => {
	const [isOpenModal, setOpenModal] = useState(false);
	const [isLoading, setLoading] =  useState(false)
	const { botClient, refreshBots, setSelectedBot } = useUserBotsContext();

	const openConfigureBot = (bot: Bot) => {
		setSelectedBot(bot);
		setOpenModal(true);
	};

	const closeConfigureBot = async () => {
		setSelectedBot(null);
		setOpenModal(false);
	};

	const createBot = async (req: CreateBotRequest) => {
		if (botClient === null) {
			throw new Error("Bot client is null");
		}
		setLoading(true);
		await botClient.createBot(req);
		setSelectedBot(null);
		setOpenModal(false);
		await refreshBots();
		setLoading(false);
	};

	const updateBot = async (botId: string, req: UpdateBotRequest) => {
		if (botClient === null) {
			throw new Error("Bot client is null");
		}
		setLoading(true);
		await botClient.updateBot(botId, req);
		setSelectedBot(null);
		setOpenModal(false);
		await refreshBots();
		setLoading(false);
	};



	return (
		<>
		{
		isLoading ? <Loader /> :
			<div>
				<BotCardList onConfigure={openConfigureBot} />
				<div className="mt-8 w-full flex justify-center">
					<Button text={"Add Bot"} onClick={() => setOpenModal(true)} icon={faPlus} />
				</div>
				{isOpenModal &&
				<CreateOrUpdateBotModal onClose={closeConfigureBot} updateBot={updateBot} createBot={createBot} />}
			</div>
		}
		</>
	);
};

export default BotMain;
