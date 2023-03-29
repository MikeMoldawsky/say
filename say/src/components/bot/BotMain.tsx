import React, {useState} from 'react';
import {Bot, CreateBotRequest, UpdateBotRequest} from "../../objects-api/bots";
import AddBotButton from "./AddBotButton";
import ConfigureBotPopup from "./ConfigureBotPopup";
import BotList from "./BotList";

interface BotMainProps {
	bots: Bot[];
	openChat: (bot: Bot) => void;
	createBot: (bot: CreateBotRequest) => void;
	updateBot: (bot: UpdateBotRequest) => void;
	deleteBot: (bot: Bot) => void;
}



const BotMain: React.FC<BotMainProps> = ({bots, openChat, createBot, updateBot, deleteBot}) => {
		const [isOpenPopup, setOpenPopup] = useState(false);
		const [selectedBot, setSelectedBot] = useState<Bot|null>(null);

		const openConfigureBot = (bot: Bot) => {
			setSelectedBot(bot);
			setOpenPopup(true);
		};

		const closeConfigureBot = () => {
			setSelectedBot(null);
			setOpenPopup(false);
		};

		return (<div>
			<BotList bots={bots} onChat={openChat} onConfigure={openConfigureBot} onDelete={deleteBot}/>
			<div className="mt-8 w-full flex justify-center">
				<AddBotButton onClick={() => setOpenPopup(true)}/>
			</div>
			{isOpenPopup &&
			<ConfigureBotPopup onClose={closeConfigureBot} createBot={createBot} updateBot={updateBot} bot={selectedBot}/>}
		</div>);
}


export default BotMain;

